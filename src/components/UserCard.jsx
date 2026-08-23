import { Box, Flex, Text, Avatar, Badge } from "@chakra-ui/react";

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const getPremiumStatus = (premiumAccount) => {
  if (!premiumAccount) return { label: "Sin premium", color: "gray" };

  const isExpiredByDate = new Date(premiumAccount.nextPaymentDate) < new Date();
  const isActive = premiumAccount.isPremiumNow && !isExpiredByDate;

  return isActive
    ? {
        label: `Premium hasta ${formatDate(premiumAccount.nextPaymentDate)}`,
        color: "green",
      }
    : {
        label: `Caducado el ${formatDate(premiumAccount.nextPaymentDate)}`,
        color: "red",
      };
};

const UserCard = ({ user }) => {
  const premiumStatus = getPremiumStatus(user.premiumAccount);

  return (
    <Box
      layerStyle="globalCard"
      p={4}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Flex alignItems="center" gap={3}>
        <Avatar.Root size="lg">
          <Avatar.Fallback name={`${user.name} ${user.lastName}`} />
          {user.imageProfileUrl && <Avatar.Image src={user.imageProfileUrl} />}
        </Avatar.Root>
        <Box>
          <Text textStyle="body" fontWeight="bold">
            {user.name} {user.lastName}
          </Text>
          <Text textStyle="muted" fontSize="sm">
            {user.email}
          </Text>
        </Box>
      </Flex>

      <Flex gap={2} wrap="wrap" mt={1}>
        <Badge colorPalette={user.role === "admin" ? "purple" : "blue"}>
          {user.role}
        </Badge>
        <Badge colorPalette={user.accountEnable ? "green" : "red"}>
          {user.accountEnable ? "Cuenta activa" : "Cuenta deshabilitada"}
        </Badge>
        <Badge colorPalette={premiumStatus.color}>{premiumStatus.label}</Badge>
      </Flex>

      <Text textStyle="muted" fontSize="sm">
        Registrado el {formatDate(user.createdAt)}
      </Text>
      <Text textStyle="muted" fontSize="sm">
        {user.library?.length || 0} libros en biblioteca ·{" "}
        {user.cardPayments?.length || 0} tarjetas
      </Text>
    </Box>
  );
};

export default UserCard;
