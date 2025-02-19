// Libraries/components
import React from 'react'
import { Link } from 'react-router-dom'

// Styling
import * as Styled from './style'

// Icons
import {
    FaDiscord,
    FaTwitter,
    FaMedium,
    FaGithub,
    FaTelegram,
    FaLink,
    FaPencilAlt,
} from 'react-icons/fa'
import { BsChatTextFill } from 'react-icons/bs'
import { FiGlobe } from 'react-icons/fi'

// Components
import ProfileEditModal from '../../../../components/Modal/ProfileEditModal'

// Hooks
import { useState } from 'react'
import { useAuth } from '../../../../contexts/UserContext'
import { FormStyled } from '../../../../components/Form'
import EditIcon from '../../../../theme/icons/Edit'

const BioBox = (props) => {
    const { loggedIn, userInfo } = useAuth()
    const [showEditModal, setShowEditModal] = useState(false)

    const toggleEditModal = () => setShowEditModal(!showEditModal)

    const socials = props.socials
        ? props.socials.map((social) => {
              switch (social.network) {
                  case 'discord':
                      return (
                          <Styled.SocialLink href={social.url} target="_blank">
                              <FaDiscord size={20} />
                          </Styled.SocialLink>
                      )
                  case 'twitter':
                      return (
                          <Styled.SocialLink href={social.url} target="_blank">
                              <FaTwitter size={20} />
                          </Styled.SocialLink>
                      )
                  case 'website':
                      return (
                          <Styled.SocialLink href={social.url} target="_blank">
                              <FiGlobe size={20} />
                          </Styled.SocialLink>
                      )
                  case 'medium':
                      return (
                          <Styled.SocialLink href={social.url} target="_blank">
                              <FaMedium size={20} />
                          </Styled.SocialLink>
                      )
                  case 'github':
                      return (
                          <Styled.SocialLink href={social.url} target="_blank">
                              <FaGithub size={20} />
                          </Styled.SocialLink>
                      )
                  case 'telegram':
                      return (
                          <Styled.SocialLink href={social.url} target="_blank">
                              <FaTelegram size={20} />
                          </Styled.SocialLink>
                      )
                  case 'chat':
                      return (
                          <Styled.SocialLink href={social.url} target="_blank">
                              <BsChatTextFill size={20} />
                          </Styled.SocialLink>
                      )
                  default:
                      return (
                          <Styled.SocialLink href={social.url} target="_blank">
                              <FaLink size={20} />
                          </Styled.SocialLink>
                      )
              }
          })
        : []

    const Modals = (props) => (
        <>
            <ProfileEditModal
                show={showEditModal}
                toggle={toggleEditModal}
                name={props.name}
                bio={props.bio}
                socials={props.socials}
                membership={props.daos.map((dao) => {
                    return {
                        name: dao.name,
                        dao: dao.dao,
                        logoURL: dao.logoURL,
                    }
                })}
                pfpURL={props.pfpURL}
            />
        </>
    )

    return (
        <>
            <Modals {...props} />
            <Styled.Container>
                <Styled.NameContainer>
                    <Styled.NameBox>
                        <Styled.Name>{props.name}</Styled.Name>
                        <Styled.Username>@{props.username}</Styled.Username>
                    </Styled.NameBox>
                    {loggedIn && props.id === userInfo.id && (
                        <EditIcon onClick={toggleEditModal} />
                    )}
                </Styled.NameContainer>
                <Styled.BioText>{props.bio}</Styled.BioText>
                <Styled.Socials>
                    {socials.map((social) => social)}
                </Styled.Socials>
                <div>
                    <FormStyled.Label>Membership</FormStyled.Label>
                    <Styled.MembershipBox>
                        {props.daos?.map((dao) => (
                            <Link to={`/dao/${dao.dao}`}>
                                <Styled.MembershipImg src={dao.logoURL} />
                            </Link>
                        ))}
                    </Styled.MembershipBox>
                </div>
            </Styled.Container>
        </>
    )
}

export default BioBox
