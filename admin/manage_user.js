
handleLoginAdmin();
// hiển thị danh sách user
function handleRenderUser(data) {
  const listUser = document.querySelector(".list-users");
  let resurl = `<tr>
  <th>Tên người dùng</th>
  <th>Email</th>
  <th>Vai trò</th>
  <th>Trạng thái</th>

  <th>Hành động</th>
</tr>`;
  for (const account of data) {
    if (account.role === "user") {
      resurl += `<tr>
<td>${account.name}</td>
<td>${account.email}</td>
<td>${account.role}</td>
<td>${account.status}</td>
<td><button onclick="editStatusUser('${account.email}')">Sửa</button></td>
</tr>
`;
    }
  }
  listUser.innerHTML = resurl;
}
handleRenderUser(accountsDB);
// hiển thị danh sách tìm kiếm theo tên user
function handleSeachUser() {
  const userInputSeach = document.querySelector("#manage-user-seach").value;
  const userSeach = [];
  for (const account of accountsDB) {
    // trả về giá trị đúng nếu chứa thành phần trong mảng
    if (account.name.toLowerCase().includes(userInputSeach.toLowerCase())) {
      userSeach.push(account);
    }
  }
  handleRenderUser(userSeach);
}
// hàm sửa trạng thái user
function editStatusUser(dataEmail) {
   for (const account of accountsDB) {
    if (dataEmail === account.email) {
      if (account.status === "active") {
        account.status = "inactive";
      } else {
        account.status = "active";
      }
    }
  }

  handleRenderUser(accountsDB);
}
