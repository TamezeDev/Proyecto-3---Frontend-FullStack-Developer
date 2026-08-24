import { Box, Text, Badge } from "@chakra-ui/react";

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const CardAdminItem = ({ card, selected, onSelect }) => {
  return (
    <Box
      layerStyle="globalCard"
      p={4}
      cursor="pointer"
      border={selected ? "2px solid {colors.red.500}" : undefined}
      onClick={() => onSelect(card._id)}
    >
      <Text textStyle="body" fontWeight="bold">
        {card.nameOwner}
      </Text>

      <Text textStyle="body" fontFamily="mono" mt={1}>
        {card.numberCard}
      </Text>

      <Text textStyle="muted" fontSize="sm">
        Caduca: {card.expiredDate} · CVV: {card.cvv}
      </Text>

      <Badge colorPalette={card.credit > 0 ? "green" : "gray"} mt={2}>
        Saldo: {card.credit.toFixed(2)} €
      </Badge>

      <Text textStyle="muted" fontSize="sm" mt={2}>
        Añadida el {formatDate(card.createdAt)}
      </Text>
    </Box>
  );
};

export default CardAdminItem;
