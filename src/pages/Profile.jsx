import { Flex, Heading } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import ProfileInfo from '../components/ProfileInfo'
import ProfileImage from '../components/ProfileImage'
import ChangePassword from '../components/ChangePassword'
import PremiumStatusCard from '../components/PremiumStatusCard'

const Profile = () => {
  const { user, token, updateUser } = useAuth()

  return (
    <Flex
      flexDirection="column"
      gap={8}
      p={{ base: 4, md: 8 }}
      maxWidth="600px"
      margin="0 auto"
    >
      <Heading textStyle="sectionTitle" as="h1">
        Mi perfil
      </Heading>

      <ProfileInfo user={user} />
      <PremiumStatusCard user={user} />
      <ProfileImage token={token} updateUser={updateUser} />
      <ChangePassword token={token} />
    </Flex>
  )
}
export default Profile
