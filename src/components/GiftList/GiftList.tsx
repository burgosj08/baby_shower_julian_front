import { useEffect, useState, useCallback } from "react";
import type { Gift } from "../../types/gifts";
import {
  Button,
  Category,
  Container,
  GiftImage,
  GiftInfo,
  Item,
  List,
  Subtitle,
  Title,
  AdminActions,
} from "./styles";
import { getGiftImage } from "../../utils/getGiftImage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 👉 luego lo puedes ocultar
const isAdmin = true;

const GiftList = () => {
  const [gifts, setGifts] = useState<Gift[]>([]);

  // ======================
  // FETCH REGALOS

  // ======================
  const fetchGifts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/gifts`);
      const data = await res.json();
      setGifts(data);
    } catch (error) {
      console.error("Error cargando regalos", error);
    }
  }, []);

  useEffect(() => {
    console.log("fetch gifts");
    fetchGifts();
  }, [fetchGifts]);

  // ======================
  // RESERVAR
  // ======================
  const reserveGift = async (id: string) => {
    await fetch(`${API_BASE_URL}/gifts/${id}/reserve`, {
      method: "PATCH",
    });

    fetchGifts();
  };

  // ======================
  // ADMIN
  // ======================
  const createGift = async () => {
    const name = prompt("Nombre del regalo");
    const quantity = Number(prompt("Cantidad"));
    const description = prompt("Descripción");

    if (!name || !quantity) return;

    await fetch(`${API_BASE_URL}/gifts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity, description }),
    });

    fetchGifts();
  };

  const editGift = async (gift: Gift) => {
    const name = prompt("Nombre", gift.name);
    const quantity = Number(prompt("Cantidad", String(gift.quantity)));
    const description = prompt("Descripción", gift.description);

    if (!name) return;

    await fetch(`${API_BASE_URL}/gifts/${gift._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity, description }),
    });

    fetchGifts();
  };

  const deleteGift = async (id: string) => {
    if (!confirm("¿Eliminar regalo?")) return;

    await fetch(`${API_BASE_URL}/gifts/${id}`, {
      method: "DELETE",
    });

    fetchGifts();
  };

  return (
    <Container>
      <Title>🎁 Lista de regalos Baby Shower</Title>
      <Subtitle>Bebé Julián 💙</Subtitle>

      {isAdmin && <Button onClick={createGift}>➕ Crear regalo</Button>}

      <List>
        {gifts.map((gift) => (
          <Item key={gift._id} disabled={gift.quantity === 0}>
            <GiftInfo>
              <GiftImage src={getGiftImage(gift.code)} alt={gift.name} />

              <div>
                <strong>{gift.name}</strong>
                <Category>{gift.description}</Category>
              </div>
            </GiftInfo>

            <div>
              <Button
                disabled={gift.quantity === 0}
                onClick={() => reserveGift(gift._id)}
              >
                {gift.quantity === 0
                  ? "Agotado"
                  : `Reservar (${gift.quantity})`}
              </Button>

              {isAdmin && (
                <AdminActions>
                  <Button onClick={() => editGift(gift)}>✏️</Button>
                  <Button onClick={() => deleteGift(gift._id)}>🗑</Button>
                </AdminActions>
              )}
            </div>
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default GiftList;
