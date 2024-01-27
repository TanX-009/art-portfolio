import { delet, formDataPost, formDataPut, get } from "../serviceConfig";
import Services from "../serviceUrls";

async function getCards(): Promise<any> {
  return get(Services.cards);
}

async function addCard(data: FormData): Promise<any> {
  return formDataPost(Services.add, data);
}

async function updateCard(data: FormData): Promise<any> {
  return formDataPut(Services.update, data);
}

async function deleteCard(id: string): Promise<any> {
  return delet(Services.delete, { id: id });
}

const CardService = {
  get: getCards,
  add: addCard,
  update: updateCard,
  delete: deleteCard,
};

export default CardService;
