function NhanVien() {
  this.account = '';
  this.yourName= '';
  this.email = " ";
  this.password = " ";
  this.datawork = " ";
  this.salary = " ";
  this.position = " ";
  this.timework = " ";
  this.xepLoai = function (){
    if (this.timework >= 192) {
      return  "Nhân viên xuất sắc";
    } else if (this.timework >= 176) {
      return  "Nhân viên giỏi";
    } else if (this.timework >= 160) {
      return  "Nhân viên khá";
    } else {
      return  "Nhân viên trung bình";
    }
  };
  this.luongChucVu =function (){
    if( this.position === "Sếp"){
      return this.salary * 3
    }else if (this.position === "Trưởng phòng"){
      return this.salary * 2
    }else{
      return this.salary
    }
  }
}

// NhanVien.prototype.luongChucVu =function (){
//   if( this.position === "Sếp"){
//     return this.salary * 3
//   }else if (this.position === "Trưởng phòng"){
//     return this.salary * 2
//   }else{
//     return this.salary
//   }
// }
// NhanVien.prototype.xepLoai = function (){
//   if (this.timework >= 192) {
//     return  "Nhân viên xuất sắc";
//   } else if (this.timework >= 176) {
//     return  "Nhân viên giỏi";
//   } else if (this.timework >= 160) {
//     return  "Nhân viên khá";
//   } else {
//     return  "Nhân viên trung bình";
//   }
// }