async function loadData() {
  const items = await window.api.getData();
  renderItems(items);
}

document.getElementById("addBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  await window.api.addData({ title, content });
  loadData();
});

loadData();
