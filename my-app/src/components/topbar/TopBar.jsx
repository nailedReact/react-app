import styled, { css } from "styled-components"
import Button from "../button/Button"
import iconArrowLeft from "../../assets/icon/icon-arrow-left.png"
import iconSearch from "../../assets/icon/icon-search.png"
import iconMoreVertical from "../../assets/icon/icon-more-vertical.png"
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png"

const TopBarCont = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 55px;
    z-index: 10;
    background-color: white;
    border-bottom: 0.5px solid #DBDBDB;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 12px 12px 16px;
    border-bottom: 0.5px solid #DBDBDB;
    transition: .3s;
    @media screen and (min-width: 768px){
        background-color: #C6D9E3;
        height: 60px;
    }
`
const LeftCont = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;

`
const RightCont = styled.div`
    display: flex;
    width: 50%;
    justify-content: right;
`

const BtnIcon = styled.button`
    ${({action}) => action === "back" && css`
        background: url(${iconArrowLeft});
    `};
    ${({action}) => action === "more" && css`
        background: url(${iconMoreVertical});
    `};
    ${({action}) => action === "search" && css`
        background: url(${iconSearch});
    `};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: block;
    width: 24px;
    height: 24px;
`;

const Searchinput = styled.input`
    font-size: 14px;
    background: #F2F2F2;
    border-radius: 30px;
    border: none;
    padding: 8px;
    transition: .5s;
    width: inherit;
    width: 80%;
    &:focus {
        width: 100%;
    }
    @media screen and (max-width: 768px){
        width: 90%;
    }
`;

const LogoCont = styled.div`
background: url(${Logo});
background-size: cover;
width: 162px;
height: 40px;
@media screen and (max-width: 768px){
    display: none;
}
cursor: pointer;
`

export default function TopBar({type, title, right4Ctrl, onChangeByUpper, onClickGetMsg, onClickModal}) {
    // type의 앞글자, type의 뒤의 글자를 변수에 저장한다.
    const [TypeLeft, TypeRight] = type.split('');
    const navigate = useNavigate();
    const handleClickLogo = () => {
        if (localStorage.getItem("Authorization")){
            navigate("../../../../post");
        }
        else {
            navigate("../../../../account/login");
        }
    }
    return (
        <TopBarCont>
            <LeftCont>
                {TypeLeft === "A" && !title ? <>
                    <BtnIcon action="back" onClick={() => navigate(-1)}/>
                    <LogoCont onClick={handleClickLogo}/>
                    </>
                : <></>}
                {TypeLeft === "B" && title ? <>
                    <LogoCont onClick={handleClickLogo}/>
                    <div>{title}</div>
                    </>
                : <></>}
                {TypeLeft === "A" && title ?
                <>
                    <BtnIcon action="back" onClick={() => navigate(-1)}/>
                    <div>{title}</div>
                </>
                : <></>}
            </LeftCont>
            
            <RightCont>
                {TypeRight === "0"  && <></>}
                {TypeRight === "1"  && <BtnIcon action="more" onClick={onClickModal}/>}
                {TypeRight === "2"  && <>
                <Searchinput
                    type="text"
                    placeholder="계정 검색"
                    onChange ={onChangeByUpper[0]}
                    onKeyUp = {onChangeByUpper[1]}></Searchinput>
                {/* <SearchBtn onClick={onClickGetMsg}></SearchBtn> */}
                </>}
                {TypeRight === "3"  && <BtnIcon action="search" onClick={()=> {navigate("/search")}}/>}
                {TypeRight === "4"  && <Button className="ms" form={right4Ctrl.form} onClick={onClickGetMsg} disabled={right4Ctrl.isDisabled}>저장</Button>}
                {/* disabled={right4Ctrl.isDisabled.isBtnVisible} */}
            </RightCont>
        </TopBarCont>
    )
} 