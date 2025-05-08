import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (type, action) => {
  const messages = {
    add: 'Item added successfully!',
    edit: 'Item updated successfully!',
    delete: 'Item deleted successfully!',
    error: 'Error fetching Data',
    validation: "Please fill all fields",
    updateError: "Update item has faild",
    createError: "Create item has faild",
  };

  const options = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  switch (type) {
    case 'success':
      toast.success(messages[action], options);
      break;
    case 'edit':
      toast.info(messages[action], options);
      break;
    case 'delete':
      toast.error(messages[action], options);
      break;
    case 'error':
        toast.error(messages[action], options);
        break
    case 'info':
        toast.warn(messages[action], options);
      break;
    case 'updateError':
        toast.error(messages[action], options);
      break;
    case 'createError':
        toast.error(messages[action], options);
      break;
    default:
      toast.info('Action executed.', options);
  }
};
