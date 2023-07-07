import Swal from "sweetalert2";

const handleReloadPage = () => {
  window.location.reload();
};

export const ErrorDialogPopup = () => {
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

export const ErrorFormatPopup = () => {
  Swal.fire({
    icon: "error",
    title: "ขออภัย",
    text: "ไฟล์ CSV ที่อัปโหลดไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง",
    confirmButtonText: "ลองใหม่อีกครั้ง",
  }).then((result) => {
    if (result.isConfirmed) {
      handleReloadPage();
    }
  });
  return null; // ErrorDialogPopup doesn't render anything directly
}