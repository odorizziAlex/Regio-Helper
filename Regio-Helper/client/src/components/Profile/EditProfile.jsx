import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/trash-2-dark-grey.svg";
import UploadIcon from "../../assets/upload-primary.svg";
import SaveIcon from "../../assets/save-success.svg";
import CancelIconDarkGrey from "../../assets/x-dark-grey.svg";
import CancelIconPrimary from "../../assets/x-primary.svg";
import DeleteProfileIcon from "../../assets/trash-2-dark-grey.svg";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../contexts/UserContext";
import ImageUploading from "react-images-uploading";
import ImgDummy from "../../images/dummy-profile-img.jpg";
import { zipCodes } from "../../data/zipCodes";
import Dropdown from "../Request/Dropdown";

const EditProfile = ({ loggedInUser }) => {
    const { updateUserInformation, changeProfileImage } = useContext(
        UserContext,
    );
    console.log(loggedInUser);
    const [name, setName] = useState(loggedInUser.firstName);
    const [email, setEmail] = useState(loggedInUser.email);
    const [description, setDescription] = useState(loggedInUser.bio);
    const [profileImage, setProfileImage] = useState(loggedInUser.image);
    const [location, setLocation] = useState(loggedInUser.zipCode);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showUploadPopup, setShowUploadPopup] = useState(false);
    const [
        showQualificationTitleInput,
        setShowQualificationTitleInput,
    ] = useState(false);
    const [profileImageDeleted, setProfileImageDeleted] = useState(false);
    const [profileImageChanged, setProfileImageChanged] = useState(false);
    const [qualificationList, setQualificationList] = useState([]);
    const [newQualification, setNewQualification] = useState("");

    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    useEffect(() => {
        setShowQualificationTitleInput(false);
        setProfileImageDeleted(false);
        setProfileImageChanged(false);
        setNewQualification("");
    }, [qualificationList, profileImageDeleted, profileImageChanged]);

    useEffect(() => {
        setQualificationList(loggedInUser.qualifications);
    }, []);

    const onDeleteClicked = () => {
        setShowDeletePopup(true);
    };

    const onCancelClicked = () => {
        setShowDeletePopup(false);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEMailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleQualificationInputChange = (e) => {
        setNewQualification(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleQualificationSubmit = (e) => {
        e.preventDefault();
        setQualificationList(
            qualificationList.concat([
                { id: uuidv4(), title: newQualification },
            ]),
        );
    };

    const handleGlobalSubmit = (e) => {
        updateUserInformation(
            loggedInUser,
            name,
            email,
            location,
            description,
            qualificationList,
        );
        changeProfileImage(loggedInUser, profileImage);
        setName("");
        setEmail("");
        setDescription("");
        setNewQualification("");
    };

    const onAddQualification = () => {
        setShowQualificationTitleInput(true);
    };

    const onQualificationClicked = (q) => {
        setQualificationList(
            qualificationList.filter((qual) => qual.id !== q.id),
        );
    };

    const onDeleteProfileImage = () => {
        setProfileImage(ImgDummy);
        setProfileImageDeleted(true);
    };

    const onUploadImage = (data) => {
        if (data !== undefined) {
            setProfileImage(data.data_url);
            setProfileImageChanged(true);
            setShowUploadPopup(false);
        }
    };

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    return (
        <StyledArea>
            {showDeletePopup && (
                <>
                    <Overlay onClick={onCancelClicked} />
                    <Popup>
                        <StyledMainTitle style={{ padding: "0" }}>
                            Sind Sie sicher, dass Sie dieses Profil löschen
                            möchten?
                        </StyledMainTitle>
                        <PopupDescription>
                            Diese Aktion kann nicht widerrufen werden. Alle Ihre
                            bisher erstellten Gesuche gehen dadurch verloren.
                        </PopupDescription>
                        <ButtonWrapper>
                            <div>
                                <CancelDeleteButton onClick={onCancelClicked}>
                                    <ButtonIcon src={CancelIconPrimary} />
                                    Abbrechen
                                </CancelDeleteButton>
                            </div>
                            <div>
                                <DeleteButton>
                                    <ButtonIcon src={DeleteProfileIcon} />
                                </DeleteButton>
                            </div>
                        </ButtonWrapper>
                    </Popup>
                </>
            )}
            {showUploadPopup && (
                <>
                    <Overlay
                        onClick={() => setShowUploadPopup(!showUploadPopup)}
                    />
                    <Popup>
                        <PopupTitle>Profilbild Hochladen.</PopupTitle>
                        <PopupDescription>
                            Das Bild muss mindesens eine Größe con 400x400 px
                            aufweisen und darf nihct größer als 2 MB sein.
                        </PopupDescription>

                        <ImageUploading
                            multiple
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                <div className="upload__image-wrapper">
                                    <UploadPopupWrapper>
                                        <>
                                            <StyledChangeImgButton
                                                style={
                                                    isDragging
                                                        ? {
                                                              color:
                                                                  "var(--success)",
                                                              background:
                                                                  "#def9df",
                                                          }
                                                        : undefined
                                                }
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                Hier Klicken oder Datei hier
                                                absetzen.
                                            </StyledChangeImgButton>
                                            &nbsp;
                                            {imageList.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="image-item"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <Image
                                                        src={image["data_url"]}
                                                        alt=""
                                                    />
                                                    <div className="image-item__btn-wrapper">
                                                        <ButtonWrapperUpload>
                                                            <DeleteButton
                                                                onClick={() =>
                                                                    onImageUpdate(
                                                                        index,
                                                                    )
                                                                }
                                                            >
                                                                Bearbeiten
                                                            </DeleteButton>
                                                            <DeleteButton
                                                                onClick={() =>
                                                                    onImageRemove(
                                                                        index,
                                                                    )
                                                                }
                                                            >
                                                                Verwerfen
                                                            </DeleteButton>
                                                        </ButtonWrapperUpload>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    </UploadPopupWrapper>
                                    <ButtonWrapper>
                                        <div>
                                            <DeleteButton
                                                onClick={() =>
                                                    setShowUploadPopup(
                                                        !showUploadPopup,
                                                    )
                                                }
                                            >
                                                <ButtonIcon
                                                    src={CancelIconDarkGrey}
                                                />
                                                Abbrechen
                                            </DeleteButton>
                                        </div>
                                        <div>
                                            <StyledSaveButton
                                                onClick={() =>
                                                    onUploadImage(images[0])
                                                }
                                            >
                                                <ButtonIcon src={SaveIcon} />
                                                Hochladen
                                            </StyledSaveButton>
                                        </div>
                                    </ButtonWrapper>
                                </div>
                            )}
                        </ImageUploading>
                    </Popup>
                </>
            )}
            <div>
                <ArrowLink to={`/profil/${loggedInUser.id}`}>
                    Zurück zum Profil
                </ArrowLink>
            </div>
            <StyledWrapper>
                <form>
                    <Header>
                        <LeftArea>
                            <StyledMainTitle>Profil bearbeiten</StyledMainTitle>
                        </LeftArea>
                        <RightArea>
                            <ButtonWrapper>
                                <StyledCancleButton
                                    to={`/profil/${loggedInUser.id}`}
                                >
                                    <ButtonIcon src={CancelIconDarkGrey} />
                                    Abbrechen
                                </StyledCancleButton>
                                <StyledSubmitButton
                                    type="submit"
                                    value="Submit"
                                    onClick={() => handleGlobalSubmit()}
                                    to={`/profil/${loggedInUser.id}`}
                                >
                                    <ButtonIcon src={SaveIcon} />
                                    Speichern
                                </StyledSubmitButton>
                            </ButtonWrapper>
                        </RightArea>
                    </Header>
                    <Section>
                        <LeftArea>
                            <InputWrapper>
                                <StyledLabel>Vorname</StyledLabel>
                                <StyledInput
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder="Hier Vorname eingeben"
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <StyledLabel>E-Mail Adresse</StyledLabel>
                                <StyledInput
                                    type="email"
                                    value={email}
                                    onChange={handleEMailChange}
                                    placeholder="Hier E-Mail Adresse eingeben"
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <StyledLabel>Postleitzahl</StyledLabel>
                                <Dropdown
                                    currentItem={location}
                                    setCurrentItem={setLocation}
                                    options={zipCodes}
                                    padding="20px"
                                    width="100%"
                                />
                            </InputWrapper>
                        </LeftArea>
                        <RightArea>
                            <StyledLabel>Profilbild</StyledLabel>
                            <EditImageWrapper>
                                <Image src={profileImage} />
                                <UploadWrapper>
                                    <ButtonWrapper>
                                        <StyledChangeImgButton
                                            type="button"
                                            onClick={() =>
                                                setShowUploadPopup(
                                                    !showUploadPopup,
                                                )
                                            }
                                        >
                                            <ButtonIcon src={UploadIcon} />
                                            Ändern
                                        </StyledChangeImgButton>
                                        <StyledDeleteButton
                                            type="button"
                                            onClick={() =>
                                                onDeleteProfileImage(
                                                    loggedInUser,
                                                )
                                            }
                                        >
                                            <ButtonIcon src={DeleteIcon} />
                                            Profilbild Löschen
                                        </StyledDeleteButton>
                                    </ButtonWrapper>
                                </UploadWrapper>
                            </EditImageWrapper>
                        </RightArea>
                    </Section>
                    <Section>
                        <LeftArea>
                            <StyledLabel>Persönliche Beschreibung</StyledLabel>
                            <StyledTextArea
                                multiline={true}
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Hier Beschreibung einfügen"
                            />
                        </LeftArea>
                        <RightArea>
                            {qualificationList.map((q) => (
                                <StyledQualificationItem
                                    key={q.id}
                                    type="button"
                                    onClick={() => onQualificationClicked(q)}
                                >
                                    {q.title}
                                </StyledQualificationItem>
                            ))}

                            <StyledQualificationItem
                                type="button"
                                onClick={() => onAddQualification()}
                            >
                                {showQualificationTitleInput ? (
                                    <NewQualificationWrapper>
                                        <StyledInput
                                            type="text"
                                            value={newQualification}
                                            onChange={
                                                handleQualificationInputChange
                                            }
                                            placeholder="Neue Qualifikation..."
                                        />
                                        <StyledSaveButton
                                            onClick={handleQualificationSubmit}
                                        >
                                            <SaveQualificationIcon
                                                src={SaveIcon}
                                            />
                                        </StyledSaveButton>
                                    </NewQualificationWrapper>
                                ) : (
                                    <StyledText>+</StyledText>
                                )}
                            </StyledQualificationItem>
                        </RightArea>
                    </Section>
                    <Section>
                        <div>
                            <StyledDeleteButton
                                type="button"
                                onClick={onDeleteClicked}
                            >
                                <ButtonIcon src={DeleteIcon} />
                                Profil löschen
                            </StyledDeleteButton>
                        </div>
                    </Section>
                </form>
            </StyledWrapper>
        </StyledArea>
    );
};

export default EditProfile;

const UploadPopupWrapper = styled.div``;

const NewQualificationWrapper = styled.div`
    display: flex;
`;

const StyledText = styled.p`
    color: var(--dark-grey);
`;

const StyledArea = styled.div`
    padding: 30px;
`;

const Overlay = styled.div`
    position: fixed;
    // display: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    // cursor: pointer;
`;
const Popup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: white;
    border-radius: 10px;
    float: left;
    box-sizing: border-box;
    border: 2px solid white;
    transition: all 0.2s;
    z-index: 3;
`;

const CancelDeleteButton = styled.button`
    display: flex;
    text-decoration: none;
    padding: 10px 20px;
    background: #ff3b5526;
    color: var(--primary);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-top: 10px;
    // margin-left: 20px;
    margin-right: 10px;
    // margin-bottom: 20px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const DeleteButton = styled(Link)`
    display: flex;
    text-decoration: none;
    padding: 10px 20px;
    background: var(--light-grey);
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-top: 10px;
    // margin-left: 20px;
    margin-right: 10px;
    // margin-bottom: 20px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const ArrowLink = styled(Link)`
    text-decoration: none;
`;

const StyledWrapper = styled.div`
    background: white;
    border-radius: 10px;
    margin-top: 30px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 30px;
`;
const ButtonWrapperUpload = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const StyledLabel = styled.div`
    font-size: 18px;
    margin-right: 5px;
    margin-bottom: 5px;
`;

/**
 * First section
 */

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    border-bottom: 2px solid var(--light-grey);
`;

const StyledMainTitle = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0;
    padding: 30px;
`;

const StyledSaveButton = styled.div`
    display: flex;
    text-decoration: none;
    padding: 10px 20px;
    background: #def9df;
    color: var(--success);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-top: 10px;

    margin-left: 5px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;
const StyledSubmitButton = styled(Link)`
    display: flex;
    text-decoration: none;
    padding: 20px 40px;
    background: #def9df;
    color: var(--success);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-top: 10px;

    margin-left: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const StyledCancleButton = styled(Link)`
    display: flex;
    text-decoration: none;
    padding: 20px 40px;
    background: white;
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-top: 10px;

    margin-left: 10px;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const Section = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;
    border-bottom: 2px solid var(--light-grey);
    padding: 30px;
`;
/**
 * Left area first section
 */

const LeftArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    font-size: 18px;
    margin-right: 5px;
    margin-bottom: 30px;
`;

const StyledInput = styled.input`
    border: 0;
    border-radius: 6px;
    display: block;
    width: 100%;
    padding: 20px;
    // font-size: 15px;
    font-size: 1rem;

    color: var(--black);
    background: var(--light-grey);
`;
const StyledTextArea = styled.textarea`
    border: 0;
    border-radius: 6px;
    display: block;
    width: 100%;
    height: 100px;
    padding: 20px;
    font-size: 18px;
    color: var(--black);
    background: var(--light-grey);
    resize: vertical;
`;

/**
 * Right area first section
 */
const RightArea = styled.div`
    // display: flex;
    // flex-direction: column;
    margin-left: 30px;
`;

const EditImageWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    max-width: 25%;
    border-radius: 30px;
    border: 2px solid white;
    margin-right: 20px;
`;

const StyledChangeImgButton = styled.button`
    display: flex;
    text-decoration: none;
    padding: 20px 40px;
    background: #ff3b5526;
    color: var(--primary);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin: 0 auto;
    cursor: pointer;

    &:focus {
        outline: none;
    }
`;

const StyledDeleteButton = styled.button`
    display: inline-block;
    text-decoration: none;
    padding: 20px 40px;
    background: white;
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 6px;
    margin-top: 10px;

    margin-left: 10px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: var(--light-grey);
    }

    &:focus {
        outline: none;
    }
`;

const SaveQualificationIcon = styled.img`
    width: 20px;
    // margin-right: 20px;
    border-radius: 10px;
`;
const ButtonIcon = styled.img`
    width: 20px;
    margin-right: 20px;
    border-radius: 10px;
`;
const UploadWrapper = styled.div``;

const Description = styled.div`
    font-size: 13px;
    margin-top: 20px;
    color: var(--dark-grey);
    margin-left: 10px;
    // width: 100px;
`;
const PopupDescription = styled.div`
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 20px;
    color: var(--dark-grey);
`;

const PopupTitle = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0;
`;

/**
 * left area second section
 */

/**
 * right area second section
 */

const StyledQualificationItem = styled.button`
    display: inline-block;
    text-align: center;
    text-decoration: none;
    padding: 10px 20px;
    background: var(--light-grey);
    color: var(--dark-grey);
    font-weight: 600;
    font-size: 1rem;
    border: 0;
    border-radius: 30px;
    cursor: pointer;
    margin-right: 5px;
    margin-bottom: 5px;

    &:focus {
        outline: none;
    }
`;
