// Gerekli modüllerin import edilmesi
const { app, BrowserWindow, Menu, shell, ipcMain, Tray } = require('electron');
const path = require('node:path');

// İşletim sistemi kontrolü
const isMac = process.platform === 'darwin';

// Pencere oluşturulma fonksiyonu
const createWindow = () => {
  // Yeni bir pencere oluşturulması
  const mainWindow = new BrowserWindow({
    name: 'Chatbot', // Pencere adı
    width: 750, // Pencere genişliği
    maxWidth: 850, // Pencere maksimum genişliği
    minWidth: 650, // Pencere minimum genişliği
    height: 500, // Pencere yüksekliği
    show: false, // Pencerenin gösterilmesi
    icon: './src/assets/icon.png', // Pencere simgesi
    webPreferences: { // Pencere ayarları
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  let tray = new Tray('./src/assets/icon.png');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Bana ulaşın',
      submenu: [
        {
          label: "Hamza Eren Sarpdağ",
          submenu: [
            {
              label: "GitHub",
              click: async () => {
                await shell.openExternal('https://github.com/Hamza-Eren') // GitHub linki
              }
            },
            {
              label: "LinkedIn",
              click: async () => {
                await shell.openExternal('https://www.linkedin.com/in/hamza-eren-sarpdag/') // LinkedIn linki
              }
            },
            {
              label: "Mail",
              click: async () => {
                await shell.openExternal('mailto:herensarpdag@gmail.com') // Mail adresi
              }
            }
          ]
        },
      ]
    },
    {
      label: 'Kapat',
      click: function () {
        mainWindow.hide();
      }
    }
  ]);
  tray.setToolTip('Chatbot');
  tray.setContextMenu(contextMenu);

  // Pencereye dosyanın yüklenmesi
  mainWindow.loadFile(
    path.join(__dirname, 'build', "index.html")
  );

  // Pencerenin hazır olduğunda gösterilmesi
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Pencerenin menüsünün oluşturulması
  const template = [
    ...(isMac
      ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }]
      : []),

    {
      label: 'Görünüm',
      submenu: [
        { label: 'Yenile', role: 'reload' },
        { label: 'Yenilemeye zorla', role: 'forceReload' },
        { type: 'separator' },
        { label: 'Sıfırla', role: 'resetZoom' },
        { label: 'Yakınlaş', role: 'zoomIn' },
        { label: 'Uzaklaş', role: 'zoomOut' }
      ]
    },
    {
      label: 'Sohbeti sıfırla',
      submenu: [
        {
          label: 'Emin misiniz ?',
          submenu: [
            {
              label: 'Evet',
              click: () => {
                mainWindow.webContents.send('clear-chat');
              }
            },
          ]
        }
      ]
    },
    {
      label: 'Bana ulaşın',
      submenu: [
        {
          label: "Hamza Eren Sarpdağ",
          submenu: [
            {
              label: "GitHub",
              click: async () => {
                await shell.openExternal('https://github.com/Hamza-Eren') // GitHub linki
              }
            },
            {
              label: "LinkedIn",
              click: async () => {
                await shell.openExternal('https://www.linkedin.com/in/hamza-eren-sarpdag/') // LinkedIn linki
              }
            },
            {
              label: "Mail",
              click: async () => {
                await shell.openExternal('mailto:herensarpdag@gmail.com') // Mail adresi
              }
            }
          ]
        },
      ]
    }
  ]

  // Sayfayı yenilemek için
  ipcMain.on('refresh-chat', (event) => {
    mainWindow.reload();
  });

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
};

// Uygulamanın hazır olduğunda pencerenin oluşturulması
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Uygulamanın hakkında ayarları
app.setAboutPanelOptions({
  applicationName: "Chatbot",
  applicationVersion: "1.0.0",
  version: "1.0.0",
  authors: ["Hamza Eren Sarpdağ", "Mert Uzunçakmak", "Furkan Durceylan"],
  website: "",
  iconPath: "./src/assets/icon.png"
});

// Uygulama görev çubuğu ayarları
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'Selam 👋'
  },
]);