import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Section from "../../../Components/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTimes,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { studyApi, portFolioApi } from "../../../Api";
import Loader from "react-loader-spinner";
import RecruitOne from "../../../Components/RecruitOne";
import List from "../../../Components/List";
import RecruitDetail from "../../../Components/RecruitDetail";
import Applicant from "../../../Components/Applicant";
import Popup from "../../../Components/Popup";
import Navigation from "../../../Components/Navigation";
import MemberList from "../../../Components/MemberList";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Makecenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Navbar = styled.div`
  height: 70px;
  width: 85%;
  border-bottom: 1px solid #b6b6b6;
`;
const NavBtn = styled.button`
  width: 15%;
  height: 100%;
  border-bottom: 3px solid ${(props) => (props.picked ? "#B6B6B6" : "white")};
  opacity: ${(props) => (props.picked ? 1 : 0.3)};
  font-weight: 500;
  font-size: 20px;
  transition: all 300ms ease-in-out;
  transform: translateY(5%);
`;

const MemberData = styled.div`
  width: 85%;
  margin: 20px 0;
`;
const RruCreateBtn = styled.button`
  height: 230px;
  border-radius: 20px;
  box-shadow: 0 3px 6px lightgray;
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: lightgray;
  font-weight: 500;
  font-size: 30px;
  transition: all 300ms ease-in-out;
  &:hover {
    color: black;
    transform: translateY(-5px);
    box-shadow: 0px 8px 11px rgba(0, 0, 0, 0.24);
  }
`;
const PopupBkg = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.status ? "flex" : "none")};
`;
const PopupUser = styled.form`
  width: 900px;
  height: 720px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
`;
const DelpopupBtn = styled.button`
  background-color: transparent;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 20px;
  color: lightgray;
  &:hover {
    color: black;
  }
  transition: all 200ms ease-in-out;
`;
const RoomInput = styled.textarea`
  width: 100%;
  height: 50px;
  background-color: RGB(238, 238, 238);
  border: none;
  outline: none;
  font-size: 17px;
  font-weight: 500;
  padding: 10px;
  &:focus {
    background-color: RGB(244, 248, 247);
  }
  transition: all 300ms ease-out;
  resize: none;
`;
const CreateRecruitTitle = styled.h1`
  font-size: 50px;
  font-weight: 700;
`;
const PositionList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 20px;
  overflow-y: scroll;
  height: 160px;
`;
const PositionBtn = styled.button`
  opacity: ${(props) => (props.checked ? 1 : 0.3)};
  border: 2px solid RGB(238, 238, 238);
  width: 100%;
  height: 50px;
  background-color: ${(props) =>
    props.checked ? "RGB(238,238,238)" : "white"};
  border-radius: 20px;
  display: grid;
  grid-template-columns: ${(props) => (props.checked ? "1fr 1fr" : "1fr")};
  font-size: 7px;
  transition: all 300ms ease-in-out;
`;
const PositionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 100%;
  font-weight: 500;
`;
const PositionValue = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 100%;
  width: 100%;
  font-weight: 500;
  text-align: center;
  border: none;
  pointer-events: none;
  background-color: transparent;
`;

const InputNumber = styled.div`
  grid-template-columns: 0.5fr 0.5fr;
  height: 100%;
  display: ${(props) => (props.checked ? "grid" : "none")};
`;
const InputUpDown = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
const UpDownBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;

  &:hover {
    transform: scale(1.2, 1.2);
  }
  transition: transform 300ms ease;
`;

const Submit = styled.input`
  opacity: ${(props) => (props.disabled ? 0.1 : 1)};
  width: 30%;
  height: 50px;
  border-radius: 20px;
  border: 5px solid lightgray;
  font-weight: 500;
  transition: all 300ms ease-out;
  color: ${(props) => (props.disabled ? "lightgray" : "black")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  background-color: ${(props) => (props.disabled ? "white" : "lightgray")};
`;
const NewCgry = styled.div`
  border-top: 1px solid lightgray;
  width: 100%;
  margin-top: 45px;
  position: relative;
`;
const Title2 = styled.div`
  background-color: white;
  font-size: 20px;
  color: #4a565e;
  position: absolute;
  top: -30px;
  left: 90px;
  text-align: center;
  font-weight: 700;
  padding: 20px;
  display: ${(props) => (props.status ? "block" : "none")};
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${(props) => props.setting.justify};
  align-items: ${(props) => props.setting.align};
  flex-direction: ${(props) => props.setting.dir};
`;

const Text = styled.span`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: rgb(74, 86, 94);
  display: inline-flex;
`;

const Member = ({
  getPositionList,
  location,
  history,
  position,
  setPosition,
  setRcSave,
  rcSave,
  saveRecruit,
  save,
  annList,
  ann,
  setAnn,
  getApplication,
  applicant,
  getAnnouncementList,
  getAnn,
  setApplicant,
  memberListData,
}) => {
  const {
    state: { idx, where },
  } = location;
  const [picked, setPicked] = useState({
    first: true,
    second: false,
  });

  console.log(ann);

  const [popup, setPopup] = useState(false);
  const [recruitPopup, setRecruitPopup] = useState(false);
  const [appPopup, setAppPopup] = useState({ popup: false, num: undefined });

  const [recruitIdx, setRecruitIdx] = useState(undefined);
  const [disabled, setDisabled] = useState(true);
  const [port, setPort] = useState(undefined);
  const [memberCondition, setMemberCondition] = useState({
    kind: "Recruit",
  });
  // this.setState(prevState => ({
  //     todoItems: prevState.todoItems.map(
  //       el => el.key === key? { ...el, status: 'done' }: el
  //     )
  //   }))

  useEffect(() => {
    var copythem = [...position];
    copythem = copythem.filter((e) => e.checked == true);
    copythem.length && rcSave.title.length && rcSave.content.length
      ? setDisabled(false)
      : setDisabled(true);
  }, [position, rcSave]);

  useEffect(() => {
    setPosition([]);

    getPositionList();
    getApplication();
    save();
    {
      where == "recruit" &&
        setPicked({
          first: false,
          second: true,
        });
    }
  }, []);
  useEffect(() => {
    if (recruitPopup) {
      getAnn(recruitIdx);
      getPortFolioList();
    }
  }, [recruitPopup]);

  const getPortFolioList = async () => {
    const { data } = await portFolioApi.getPortFolioList();
    if (data) {
      var copyData = data;
      const checkedPort = copyData.map((e) => ({
        idx: e.idx,
        title: e.title,
        content: e.content,
        reg_date: e.reg_date,
        position: e.position,
        stack: e.tech,
        education: e.education,
        checked: false,
      }));
      setPort(checkedPort);
    }
  };

  const UpDown = (e) => {
    {
      e.target.childNodes.length
        ? ChangeDm(e.target.id, e.target.dataset.type)
        : ChangeDm(
            e.target.parentElement.id,
            e.target.parentElement.dataset.type
          );
    }
  };
  const ChangeDm = (number, type) => {
    const copyPosition = [...position];
    if (copyPosition[number].demand < 5 && copyPosition[number].demand > 1) {
      {
        type == "true"
          ? (copyPosition[number].demand += 1)
          : (copyPosition[number].demand -= 1);
      }
    } else if (copyPosition[number].demand == 1) {
      {
        type == "true"
          ? (copyPosition[number].demand += 1)
          : console.log("fuckit");
      }
    } else {
      {
        type == "false"
          ? (copyPosition[number].demand -= 1)
          : console.log("fuckit");
      }
    }
    setPosition([...copyPosition]);
  };
  const PositionBtnHandler = (e) => {
    const copyPosition = [...position];
    if (e.target.checked === false && !e.target.dataset.type) {
      {
        e.target.childNodes.length
          ? (copyPosition[e.target.id].checked = true)
          : (copyPosition[e.target.parentElement.id].checked = true);
      }
    } else if (e.target.checked === true && !e.target.dataset.type) {
      {
        e.target.childNodes.length
          ? (copyPosition[e.target.id].checked = false)
          : (copyPosition[e.target.parentElement.id].checked = false);
      }
    }
    setPosition(copyPosition);
  };
  const changeRc = (e) => {
    const copyRcSave = {
      studyIdx: idx,
      title: rcSave.title,
      content: rcSave.content,
    };
    if (e.target.dataset.kind == "0") {
      copyRcSave.title = e.target.value;
    } else if (e.target.dataset.kind == "1") {
      copyRcSave.content = e.target.value;
    }
    {
      copyRcSave && setRcSave(copyRcSave);
    }
  };

  const SumbitHandler = (e) => {
    e.preventDefault();
    var copythem = [...position];
    copythem = copythem.filter((e) => e.checked == true);
    // copythem.map(e=> {delete e.checked})
    const data = {
      study: { idx },
      title: rcSave.title,
      content: rcSave.content,
      demandPosition: [...copythem],
    };
    saveRecruit(data);
    history.push({
      pathname: location.pathname,
      state: { idx, where: "recruit" },
    });
    DelectAll();
  };

  const returnDetail = (recruitPopup) =>
    recruitPopup ? (
      <RecruitDetail
        popup={recruitPopup}
        setPopup={setRecruitPopup}
        ann={ann}
        port={port}
        getPortFolioList={getPortFolioList}
        getAnnouncementList={getAnnouncementList}
        location={location}
        history={history}
        setAnn={setAnn}
        type={"member"}
        setApplicant={setApplicant}
        save={save}
      ></RecruitDetail>
    ) : null;

  const returnAppDetail = (popup, setPopup, applicant) => {
    return applicant && popup.state ? (
      <Popup
        status={popup.state}
        component={() => Applicant(applicant[popup.num], getApplication)}
        setPopup={setPopup}
        size={{ width: "1200px", height: "700px" }}
      ></Popup>
    ) : null;
  };
  const DelectAll = () => {
    setPopup(false);
    setPosition([]);
    getPositionList();
    save();
  };

  // (<RruCreateBtn onClick ={() => setPopUp(true)} >
  //             <h2>fuck </h2>
  //             <FontAwesomeIcon icon={faPlusCircle} style={{fontSize:50}}/>
  //         </RruCreateBtn>)
  // {AnnList&&getAnn(AnnList[0].idx)}
  const navbar = [
    {
      idx: 129,
      component: (state) =>
        state ? (
          <>
            <NewCgry>
              <Title2 status={true}>Member</Title2>
            </NewCgry>
            <MemberList data={memberListData} />
          </>
        ) : null,
      name: "Member",
      page: { pno: 1, lastPno: 1 },
    },
    {
      idx: 130,
      component: (state) =>
        state ? (
          <>
            <NewCgry>
              <Title2 status={true}>Recruit</Title2>
            </NewCgry>
            <>
              {ann ? (
                typeof ann === "string" ? (
                  <Flex
                    setting={{
                      justify: "center",
                      align: "center",
                      dir: "column",
                    }}
                    style={{ marginTop: 35 }}
                  >
                    <Flex
                      setting={{
                        justify: "center",
                        align: "center",
                        dir: "rows",
                      }}
                      style={{
                        height: 250,
                        borderRadius: 20,
                        boxShadow: "0 3px 6px lightgray",
                      }}
                    >
                      <Text size={"25px"} weight={"500"}>
                        You do not have permission. Please go back!
                      </Text>
                    </Flex>
                  </Flex>
                ) : (
                  <>
                    <RecruitOne
                      annList={[ann]}
                      type={"Member"}
                      setRecruitIdx={setRecruitIdx}
                      setPopup={setRecruitPopup}
                    ></RecruitOne>
                    <List applicant={applicant} setPopup={setAppPopup} />
                  </>
                )
              ) : (
                <RruCreateBtn onClick={() => setPopup(true)}>
                  <h2>
                    There are no registered recruitment. Please make a new one!
                  </h2>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ fontSize: 50 }}
                  />
                </RruCreateBtn>
              )}
            </>
          </>
        ) : null,
      name: "Recruit",
    },
  ];

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{ width: "100%" }}
    >
      <Container>
        <Section
          title={"Member"}
          message={"Let's team up and make your dreams come true."}
          nav={false}
        />
        {/* 
        />
        <Navbar>
          <NavBtn picked={picked["first"]}>Members</NavBtn>
          <NavBtn picked={picked["second"]}>Recruit</NavBtn>
        </Navbar>
        <MemberData>
          {ann ? (
            <>
              <RecruitOne
                annList={[ann]}
                type={"Member"}
                setRecruitIdx={setRecruitIdx}
                setPopup={setRecruitPopup}
              ></RecruitOne>
              <List applicant={applicant} setPopup={setAppPopup} />
            </>
          ) : (
            <RruCreateBtn onClick={() => setPopup(true)}>
              <h2>
                There are no registered recruitment. Please make a new one!
              </h2>
              <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: 50 }} />
            </RruCreateBtn>
          )}
        </MemberData> */}
        <Navigation
          navbar={navbar}
          data={memberCondition}
          change={setMemberCondition}
        />
      </Container>
      {returnDetail(recruitPopup)}
      {applicant && returnAppDetail(appPopup, setAppPopup, applicant)}
      <PopupBkg status={popup}>
        <PopupUser onSubmit={SumbitHandler}>
          <DelpopupBtn type="button" onClick={DelectAll}>
            <FontAwesomeIcon style={{ fontSize: 35 }} icon={faTimes} />
          </DelpopupBtn>
          <CreateRecruitTitle>Create Recruit</CreateRecruitTitle>
          <div style={{ width: "70%" }}>
            <label style={{ marginBottom: 15, fontSize: 23, fontWeight: 500 }}>
              Title
            </label>
            <RoomInput
              onChange={changeRc}
              data-kind={0}
              placeholder="Please enter at least two characters."
              value={rcSave && rcSave.title}
            />
          </div>
          <div style={{ width: "70%" }}>
            <label style={{ marginBottom: 15, fontSize: 23, fontWeight: 500 }}>
              Description
            </label>
            <RoomInput
              onChange={changeRc}
              data-kind={1}
              style={{ height: 120 }}
              placeholder="Please enter at least ten characters.
    "
              value={rcSave && rcSave.content}
            />
          </div>

          <div style={{ width: "70%" }}>
            <label style={{ marginBottom: 15, fontSize: 23, fontWeight: 500 }}>
              Position
            </label>
            <PositionList>
              {position &&
                position.map((e, idx) => (
                  <PositionBtn
                    key={e.position.idx}
                    id={idx}
                    checked={e.checked}
                    type="button"
                    onClick={PositionBtnHandler}
                  >
                    <PositionTitle id={idx} checked={e.checked} readOnly>
                      {e.name}
                    </PositionTitle>
                    <InputNumber checked={e.checked} id={idx}>
                      <PositionValue
                        value={e.demand}
                        checked={e.checked}
                        id={idx}
                        readOnly
                      ></PositionValue>
                      <InputUpDown>
                        <UpDownBtn
                          type="button"
                          id={idx}
                          onClick={UpDown}
                          data-type={true}
                        >
                          <FontAwesomeIcon
                            id={idx}
                            data-type={true}
                            icon={faAngleUp}
                          />
                        </UpDownBtn>
                        <UpDownBtn
                          type="button"
                          id={idx}
                          onClick={UpDown}
                          data-type={false}
                        >
                          <FontAwesomeIcon
                            id={idx}
                            data-type={false}
                            icon={faAngleDown}
                          />
                        </UpDownBtn>
                      </InputUpDown>
                    </InputNumber>
                  </PositionBtn>
                ))}
            </PositionList>
          </div>
          <div
            style={{ width: "70%", display: "flex", justifyContent: "center" }}
          >
            <Submit value="CREATE" type="submit" disabled={disabled} />
          </div>
        </PopupUser>
      </PopupBkg>
    </motion.div>
  );
};

export default Member;
