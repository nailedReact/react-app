import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import data from "./chat/chatdata.json";
import OptionModal from "../../components/OptionModal/OptionModal";
import TopBar from "../../components/TopBar";
import Outgoing from "./chat/Outgoing/Outgoing";
import Incoming from "./chat/Incoming/Incoming";
import ChatInput from "./chat/ChatInput/ChatInput";
import { formattedTimeFunc } from "./dateFormat";

const Wrapper = styled.div`
    max-width: 390px;
    margin: 0 auto;
`;

const ChatContBack = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 772px;
    background-color: #f2f2f2;
    padding: 20px 16px;
`;

const ChatCont = styled.ul`
    overflow-y: scroll;
`;

export default function ChattingRoom() {
    const location = useLocation();
    const [eachChat, setEachChat] = useState();
    const [title, setTitle] = useState();
    const id = location.pathname.split("/")[2];
    const [modalVisible, setModalVisible] = useState(false);

    const filtered = useRef();

    useEffect(() => {
        filtered.current = data.chat.filter((e) => e.id === id)[0];
        console.log(filtered.current);
        setTitle(filtered.current.caller.username);
        const chatItems = filtered.current.chatData.map((e) => {
            const formattedTime = formattedTimeFunc(e.date);

            if (e.isIncoming) {
                return (
                    <Incoming
                        key={e.id}
                        imgSrc={filtered.current.caller.image}
                        type={e.typeOfContent}
                        content={e.content}
                        time={formattedTime}
                    />
                );
            } else {
                return (
                    <Outgoing
                        key={e.id}
                        type={e.typeOfContent}
                        content={e.content}
                        time={formattedTime}
                    />
                );
            }
        });
        setEachChat(chatItems);
    }, [id]);

    const onConfirm = () => {
        setModalVisible(false);
    };

    const onClickModal = () => {
        setModalVisible(true);
    };

    return (
        <Wrapper>
            {modalVisible && (
                <OptionModal onConfirm={onConfirm}>
                    <li>
                        <Link to={"/chat"}>채팅방 나가기</Link>
                    </li>
                </OptionModal>
            )}
            <TopBar type={"A1"} title={title} onClickModal={onClickModal} />
            <h1 className={"ir"}>{title}님과의 채팅방 입니다.</h1>
            <ChatContBack>
                <ChatCont>{eachChat}</ChatCont>
            </ChatContBack>
            <ChatInput />
        </Wrapper>
    );
}
