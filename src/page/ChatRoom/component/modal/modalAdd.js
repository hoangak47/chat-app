import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { useContext, useMemo, useState } from 'react';
import Context from '~/context/context';
import { db } from '~/firebase/config';

function DebounceSelect({ fetchOptions, DebounceTimeout = 700, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadingOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.currMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadingOptions, DebounceTimeout);
    }, [fetchOptions, DebounceTimeout, props.currMembers]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : 'Not Found'}
            {...props}
        >
            {options.map((option, index) => {
                return (
                    <Select.Option key={option.value} value={option.value}>
                        <Avatar size="small" src={option.avatar}>
                            {option.avatar ? '' : option.label.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {`${option.label}`}
                    </Select.Option>
                );
            })}
        </Select>
    );
}

async function fetchUserList(search, currMembers) {
    return db
        .collection('users')
        .where('keyword', 'array-contains', search)
        .orderBy('displayName')
        .get()
        .then((snapshot) => {
            return snapshot.docs
                .map((doc) => {
                    console.log(doc.data());
                    const a = {
                        label: doc.data().displayName,
                        value: doc.data().uid,
                        avatar: doc.data().photoURL,
                    };
                    return a;
                })
                .filter((v) => !currMembers.includes(v.value));
        });
}

function ModalAdd({ modalAdd, setModalAdd }) {
    const context = useContext(Context);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = () => {
        const roomRef = db.collection('rooms').doc(context.listRoom[context.indexRoom].id);
        roomRef.update({
            members: [...context.listRoom[context.indexRoom].members, ...value.map((v) => v.value)],
        });
        setModalAdd(false);
        setValue([]);
        form.resetFields();
    };

    const handleCancel = () => {
        setModalAdd(false);
    };

    // console.log(value);
    return (
        <Modal
            title="Mời thêm thành viên"
            visible={modalAdd}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true}
        >
            <Form form={form} layout="vertical">
                <DebounceSelect
                    mode="multiple"
                    name="search-user"
                    label="Tên các thành viên"
                    value={value}
                    placeholder="Nhập tên thành viên"
                    fetchOptions={fetchUserList}
                    onChange={(newValue) => {
                        console.log(newValue);
                        setValue(newValue);
                    }}
                    style={{ width: '100%' }}
                    currMembers={context.listRoom[context.indexRoom]?.members}
                ></DebounceSelect>
            </Form>
        </Modal>
    );
}

export default ModalAdd;
