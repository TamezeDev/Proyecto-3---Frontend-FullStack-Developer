import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const PremiumStatusCard = ({ user }) => {
  const premiumAccount = user?.premiumAccount;

  if (!premiumAccount) {
    return (
      <Box layerStyle="globalCard" textAlign="center">
        <Heading textStyle="title" as="h2" mb={2}>
          Cuenta premium
        </Heading>
        <Text textStyle="muted" mb={4}>
          Todavía no tienes ningún plan activo.
        </Text>
        <Button asChild layerStyle="headerBtn">
          <NavLink to="/premium">Ver planes premium</NavLink>
        </Button>
      </Box>
    );
  }

  const nextPaymentDate = new Date(premiumAccount.nextPaymentDate);
  const isExpiredByDate = nextPaymentDate < new Date();
  const isActive = premiumAccount.isPremiumNow && !isExpiredByDate;

  return (
    <Box layerStyle="globalCard">
      <Heading textStyle="title" as="h2" mb={3}>
        Cuenta premium
      </Heading>

      <Text
        textStyle="body"
        fontWeight="bold"
        color={isActive ? "green.600" : "red.500"}
        mb={2}
      >
        {isActive ? "Activa" : "Caducada"}
      </Text>

      <Text textStyle="muted">
        Duración del plan: {premiumAccount.durationMonths}{" "}
        {premiumAccount.durationMonths === 1 ? "mes" : "meses"}
      </Text>

      <Text textStyle="muted">
        Último pago: {formatDate(premiumAccount.lastPaymentDate)}
      </Text>

      <Text textStyle="muted" mb={4}>
        {isActive ? "Próximo pago" : "Caducó el"}:{" "}
        {formatDate(premiumAccount.nextPaymentDate)}
      </Text>

      {!isActive && (
        <Button asChild layerStyle="headerBtn">
          <NavLink to="/premium">Renovar ahora</NavLink>
        </Button>
      )}
    </Box>
  );
};

export default PremiumStatusCard;
