/* eslint-disable array-callback-return */
import { Alert, Avatar, Button, Form, message, Modal, Select, Space, Spin } from 'antd';
import { debounce } from 'lodash';
import React, { useContext, useMemo, useState } from 'react';
import Context from '~/context/context';
import { db } from '~/firebase/config';

import './modalAdd.scss';

export function DebounceSelect({ fetchOptions, DebounceTimeout = 700, currMembers, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadingOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, currMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadingOptions, DebounceTimeout);
    }, [fetchOptions, DebounceTimeout, currMembers]);

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

export async function fetchUserList(search, currMembers) {
    return db
        .collection('users')
        .where('keyword', 'array-contains', search)
        .orderBy('displayName')
        .get()
        .then((snapshot) => {
            return snapshot.docs
                .map((doc) => {
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

    const [i, setI] = useState(null);

    const [aler, setAler] = useState(false);

    const handleOk = () => {
        if (context.listRoom[context.indexRoom]?.members.length === 1) {
            if (value.length === 0) {
                message.error('Please select at least one friend');
                return;
            }
            if (value.length === 1) {
                let check;
                context.listRoom.map((room, index) => {
                    if (room.members.includes(value[0].value)) {
                        check = true;
                        setI(index);
                    }
                });

                if (check) {
                    setAler(true);
                    return;
                } else {
                    const roomRef = db.collection('rooms').doc(context.listRoom[context.indexRoom].id);
                    roomRef.update({
                        members: [...context.listRoom[context.indexRoom].members, ...value.map((v) => v.value)],
                    });
                    setModalAdd(false);
                    setValue([]);
                    form.resetFields();
                    message.success('Invite success');
                }
            } else {
                const roomRef = db.collection('rooms').doc(context.listRoom[context.indexRoom].id);
                roomRef.update({
                    members: [...context.listRoom[context.indexRoom].members, ...value.map((v) => v.value)],
                });
                setModalAdd(false);
                setValue([]);
                form.resetFields();
                message.success('Invite success');
            }
            return;
        }
        const roomRef = db.collection('rooms').doc(context.listRoom[context.indexRoom].id);
        roomRef.update({
            members: [...context.listRoom[context.indexRoom].members, ...value.map((v) => v.value)],
        });
        setModalAdd(false);
        setValue([]);
        form.resetFields();
        message.success('Invite success');
    };

    const handleCancel = () => {
        setModalAdd(false);
        setValue([]);
        form.resetFields();
        setAler(false);
    };

    return (
        <>
            <Modal
                title="Add new member"
                visible={modalAdd}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose={true}
            >
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        name="search-user"
                        label="Search User"
                        value={value}
                        placeholder="Enter members name"
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        style={{ width: '100%' }}
                        currMembers={context.listRoom[context.indexRoom]?.members}
                    ></DebounceSelect>
                </Form>
            </Modal>
            {aler && (
                <div className="alert-modal-add-members">
                    <Alert
                        message="Info"
                        description="You have already room with this friend! The room needs at least 3 members.
                        Do you want to move to that room? "
                        type="info"
                        action={
                            <Space direction="vertical">
                                <Button
                                    size="small"
                                    type="primary"
                                    onClick={() => {
                                        setModalAdd(false);
                                        setValue([]);
                                        form.resetFields();
                                        context.setRoom(i);
                                        setAler(false);
                                        setI(null);
                                    }}
                                >
                                    Accept
                                </Button>
                                <Button onClick={() => setAler(false)} size="small" danger type="ghost">
                                    Decline
                                </Button>
                            </Space>
                        }
                    />
                </div>
            )}
        </>
    );
}

export default ModalAdd;
