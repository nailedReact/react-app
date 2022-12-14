import { useEffect, useState } from "react";
import styled from "styled-components";
import TopBar from "../../components/topbar/TopBar";
import ChatItem from "./chat/ChatItem/ChatItem";
import NavBar from "../../components/navBar/NavBar";
import data from "./chat/chatdata.json";

const ChatCont = styled.ul`
    /* height: 772px; */
    padding: 24px 16px 84.5px 16px;
    /* overflow-y: scroll; */
    /* padding: 20px; */

    @media screen and (min-width: 768px){
        max-width: 1300px;
        padding-left: 256px;
        padding-top: 50px;
        padding-bottom: 24px;
        padding: 30px 40px;
        margin-left: 240px;
    }
`;

export default function ChatList() {
    // 데이터를 가져온다는 가정으로 코드를 짜봤습니다.
    const [chatData, setChatData] = useState();

    useEffect(() => {
        const chatItems = data.chat.map(e => {
            const lastIndex = e.chatData.length - 1;

            // 카톡 미리보기 처럼 마지막 채팅 내역이 사진을 보냈을 때 미리보기에 "사진"을 표시하기 위해
            const lastChat = e.chatData[lastIndex].typeOfContent === "image" ? "사진" : e.chatData[lastIndex].content;

            return (
                <ChatItem 
                    key={e.id}
                    linkSrc={e.id}
                    image={e.caller.image}
                    isOnline={e.caller.isOnline}
                    username={e.caller.username}
                    lastChat={lastChat}
                    date={e.chatData[lastIndex].date}
                />
            );
        });

        setChatData(chatItems);
    }, []);
    
    return (
        <>
            <TopBar type={"A1"} />
            <h1 className={"ir"}>채팅 리스트</h1>
            <ChatCont>{chatData}</ChatCont>
            <NavBar />
        </>
    );
}
