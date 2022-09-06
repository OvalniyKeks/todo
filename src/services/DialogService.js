import { openDialog } from 'vue3-promise-dialog';
import Modal from '../components/Modal.vue';

export async function confirm (text) {
  return await openDialog(Modal, { text });
}
