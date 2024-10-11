import { Modal } from '@arco-design/web-react';

const confirm = (title, content, handleOrders,handleList) => {
    return (
        Modal.confirm({
            title: title,
            content: content,
            okButtonProps: {
                status: 'danger',
            },
            onOk: () => {
                //   return new Promise((resolve, reject) => {
                //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                //   }).catch((e) => {
                //     Message.error({
                //       content: 'Error occurs!',
                //     });
                //     throw e;
                //   });
                // wuyu()
                
                handleOrders()
                handleList()
            },

        }))
}
export default confirm;