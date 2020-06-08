import React, { useState } from 'react';
import Modal from '../../components/modals/regular-modal'
import DataTable from './data-table'

function FriendModal(){
    const [modalVisible, setModalVisible] = useState(false)
    const openModal = () => {
        setModalVisible(true)
    }
    const closeModal = () => {
        setModalVisible(false)
    }

    return (
        <>
            <button onClick={openModal}>친구 추가</button>
            {
                modalVisible && <Modal
                    visible={modalVisible}
                    closable={true}
                    maskClosable={true}
                    onClose={closeModal}>
                        <DataTable
                        closeModal = {closeModal}
                        usePaging = {true}
                        pageNo = {1}
                        pageScale = {25} 
                        totalCount = {0}>
                        </DataTable>
                    </Modal>
            }
        </>
    )
}

export default FriendModal;
