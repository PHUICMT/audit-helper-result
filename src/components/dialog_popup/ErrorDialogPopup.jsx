import Swal from "sweetalert2";

const ErrorDialogPopup = () => {
  const handleReloadPage = () => {
    window.location.reload();
  };

  Swal.fire({
    icon: "error",
    title: "ขออภัย",
    text: "เกิดข้อผิดพลาดในการอัปโหลดไฟล์ CSV กรุณาลองใหม่อีกครั้ง",
    confirmButtonText: "ลองใหม่อีกครั้ง",
  }).then((result) => {
    if (result.isConfirmed) {
      handleReloadPage();
    }
  });
  return null; // ErrorDialogPopup doesn't render anything directly
};

export default ErrorDialogPopup;
