let mangNhanVien = [];
var check = new Validation();

var myForm = document.getElementById("myForm");

document.querySelector("#btnThemNV").onclick = function () {

  let nv = new NhanVien();
  nv.account = document.querySelector("#tknv").value;
  nv.yourName = document.querySelector("#name").value;
  nv.email = document.querySelector("#email").value;
  nv.password = document.querySelector("#password").value;
  nv.datawork = document.querySelector("#datepicker").value;
  nv.salary = document.querySelector("#luongCB").value;
  nv.position = document.querySelector("#chucvu").value;
  nv.timework = document.querySelector("#gioLam").value;

  var valid = true;

  valid =
    check.checkEmty(nv.account, "tbTKNV", "Tài Khoản") &
    check.checkEmty(nv.yourName, "tbTen", "Tên Nhân Viên") &
    check.checkEmty(nv.email, "tbEmail", "Email") &
    check.checkEmty(nv.password, "tbMatKhau", "Mật Khẩu") &
    check.checkEmty(nv.salary, "tbLuongCB", "Lương Cơ Bản") &
    check.checkEmty(nv.timework,"tbGiolam", "Giờ Làm") &
    check.checkEmty(nv.datawork, "tbNgay","Ngày làm");


  valid = valid & check.checkLetter(nv.yourName, "tbTen", "Tên Nhân Viên");
  valid = valid & check.checkemail(nv.email, "tbEmail", "Email");
  valid = valid & check.checkLength(nv.account, "tbTKNV", "Tài Khoản", 4, 6);
  valid = valid & check.checkPassword(nv.password, "tbMatKhau", "Mật Khẩu", 6, 10);
  valid = valid & check.checkNumber(
      nv.salary,
      "tbLuongCB",
      "Lương Cơ Bản",
      1000000,
      20000000
    );
  valid = valid & check.checkRole(nv.luongChucVu, "tbChucVu");
  valid = valid & check.checkNumber(nv.timework, "tbGiolam", "Giờ Làm", 80, 200);
  valid = valid & check.checkDate(nv.datawork, "tbNgay","Ngày làm");

  if (!valid) {
    return;
  }
  
  mangNhanVien.push(nv);
  renderNhanVien(mangNhanVien);
  luulocalStorage();
 
};
document.getElementById("btnThem").onclick = function () {
  document.getElementById("btnThemNV").disabled = false;
  document.getElementById("btnCapNhat").disabled = true;
  document.getElementById("tknv").disabled = false;
  // Reset lại form
  myForm.reset();
};
// lấy thông tin nhân viên 
function layThongTin(accountNV) {
  document.getElementById("btnCapNhat").disabled = false;
  document.getElementById("btnThemNV").disabled = true;
  document.getElementById("tknv").disabled = true;
  for (var index = 0; index < mangNhanVien.length; index++) {
    if (mangNhanVien[index].account === accountNV) {
      //in thông tin sinh viên tìm thấy lên giao diện
      document.getElementById("tknv").value = mangNhanVien[index].account;
      document.getElementById("name").value = mangNhanVien[index].yourName;
      document.getElementById("email").value = mangNhanVien[index].email;
      document.getElementById("password").value = mangNhanVien[index].password;
      document.getElementById("datepicker").value =
        mangNhanVien[index].datawork;
      document.getElementById("luongCB").value = mangNhanVien[index].salary;
      document.getElementById("chucvu").value = mangNhanVien[index].position;
      document.getElementById("gioLam").value = mangNhanVien[index].timework;
      break;
    }
  }
}
// Update button
document.getElementById("btnCapNhat").onclick = function () {
  var nhanVienEdit = new NhanVien();
  nhanVienEdit.account = document.getElementById("tknv").value;
  nhanVienEdit.yourName = document.getElementById("name").value;
  nhanVienEdit.email = document.getElementById("email").value;
  nhanVienEdit.password = document.getElementById("password").value;
  nhanVienEdit.datawork = document.getElementById("datepicker").value;
  nhanVienEdit.position = document.getElementById("chucvu").value;
  nhanVienEdit.salary = +document.getElementById("luongCB").value;
  nhanVienEdit.timework = +document.getElementById("gioLam").value;



  for (var index = 0; index < mangNhanVien.length; index++) {
    if (mangNhanVien[index].account === nhanVienEdit.account) {
      mangNhanVien[index].yourName = nhanVienEdit.yourName;
      mangNhanVien[index].email = nhanVienEdit.email;
      mangNhanVien[index].password = nhanVienEdit.password;
      mangNhanVien[index].datawork = nhanVienEdit.datawork;
      mangNhanVien[index].salary = nhanVienEdit.salary;
      mangNhanVien[index].position = nhanVienEdit.position;
      mangNhanVien[index].timework = nhanVienEdit.timework;
      break;
    }
  }

  renderNhanVien(mangNhanVien);
  luulocalStorage();
  
  myForm.reset();
};

function renderNhanVien(array) {
  var template = "";
  for (var index = 0; index < array.length; index++) {
    var nv = array[index];
    template += `<thead >
    <tr>
      <th class="nowrap">
        <span class="mr-1">${nv.account}</span>
      </th>
      <th>${nv.yourName}</th>
      <th>${nv.email}</th>
      <th>${nv.datawork}</th>
      <th>${nv.position}</th>									
      <th>${nv.luongChucVu()}</th>
      <th>${nv.xepLoai()}</th>
      <th><button class="fa fa-pencil btnEdit btn btn-success" style="pointer-event:none;"  data-toggle="modal"
      data-target="#myModal" onclick="layThongTin('${
        nv.account
      }')"></button></th>
      <th>
      <button class="btn btn-danger" onclick="xoaNhanVien('${
        nv.account
      }')">Xoá</button>
      </th>
    </tr>
    </thead>`;
  }
  document.querySelector("tbody").innerHTML = template;
  return template;
}

// xóa nhân viên 
function xoaNhanVien(accountNV) {
  // alert(maSVClick);
  var indexDel = -1;
  for (var index = 0; index < mangNhanVien.length; index++) {
    if (mangNhanVien[index].account === accountNV) {
      indexDel = index;
      break;
    }
  }
  //Xoá đi sinh viên tại vị trí đó trong mảng
  mangNhanVien.splice(indexDel, 1);
  //Tạo lại bảng table Sinh Viên
  luulocalStorage();
  renderNhanVien(mangNhanVien);
} 





//lưu thông tin
function luulocalStorage() {
  var stringMangNhanVien = JSON.stringify(mangNhanVien);
  localStorage.setItem("mangNhanVien", stringMangNhanVien);
}
// lấy thông tin
function laylocalStorage() {
  if (localStorage.getItem("mangNhanVien")) {
    var stringMangNhanVien = localStorage.getItem("mangNhanVien");

    //Chuyển dữ string liệu về dạng object
    var mang = JSON.parse(stringMangNhanVien);
    console.log(mang);
    for (var i = 0; i < mang.length; i++) {
      var nv = new NhanVien();
      nv.account = mang[i].account;
      nv.yourName = mang[i].yourName;
      nv.email = mang[i].email;
      nv.password = mang[i].password;
      nv.datawork = mang[i].datawork;
      nv.salary = mang[i].salary;
      nv.position = mang[i].position;
      nv.timework = mang[i].timework;
      mangNhanVien.push(nv);
    }

    //Gọi hàm tạo giao diện từ mảng
    renderNhanVien(mangNhanVien);
  }
}
laylocalStorage();

// tìm kiếm
document.getElementById("searchName").oninput = function () {
  var keyword = document.getElementById("searchName").value;
  var mangXepLoai = [];
  keyword = stringToSlug(keyword);
  for (var index = 0; index < mangNhanVien.length; index++) {
    var xepLoai = stringToSlug(mangNhanVien[index].xepLoai());
    if (xepLoai.search(keyword) !== -1) {
      mangXepLoai.push(mangNhanVien[index]);
    }
  }
  renderNhanVien(mangXepLoai);
};

function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase().trim();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");
  return slug;
}
