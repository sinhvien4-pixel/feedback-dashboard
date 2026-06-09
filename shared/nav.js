(function () {
  const currentFile = location.pathname.split('/').pop();

  const nav = document.createElement('nav');
  nav.className = 'bg-white border-b border-gray-200 shadow-sm';
  nav.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
      <span class="text-lg font-semibold text-gray-800">📋 Feedback Dashboard</span>
      <div class="flex gap-4">
        <a href="submit.html"
           class="px-3 py-1.5 rounded text-sm font-medium transition-colors
                  ${currentFile === 'submit.html'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'}">
          Gửi Phản Hồi
        </a>
        <a href="admin.html"
           class="px-3 py-1.5 rounded text-sm font-medium transition-colors
                  ${currentFile === 'admin.html'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'}">
          Quản Trị
        </a>
      </div>
    </div>
  `;

  document.body.prepend(nav);
})();
