import { Form, message, Modal } from 'antd';
import { useContext, useState } from 'react';
import { AppContext } from '~/context/appProvider';
import { db } from '~/firebase/config';
import { DebounceSelect, fetchUserList } from '../modalAddMembers/modalAdd';

function ModalAddFriend({ modalAddFriend, setModalAddFriend }) {
    const appContext = useContext(AppContext);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = () => {
        if (value.length === 0) {
            message.error('Please select at least one friend');
            return;
        }
        const roomRef = db.collection('users').doc(appContext.users[0].id);
        roomRef.update({
            friend: [...appContext.users[0].friend, ...value.map((v) => v.value)],
        });
        setModalAddFriend(false);
        setValue([]);
        form.resetFields();
        message.success('Invite success');
    };

    const handleCancel = () => {
        setModalAddFriend(false);
        setValue([]);
        form.resetFields();
    };

    return (
        <>
            <Modal
                title="Search friend"
                visible={modalAddFriend}
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
                        currMembers={appContext.users[0]?.friend}
                    ></DebounceSelect>
                </Form>
            </Modal>
        </>
    );
}

export default ModalAddFriend;
