import OneSignal from '@onesignal/capacitor-plugin';

const APP_ID = '94110f41-5110-46d1-8b75-351f4916327a';

const status = document.getElementById('status');
const button = document.getElementById('pushButton');

async function startOneSignal() {
  try {
    await OneSignal.initialize({ appId: APP_ID });
    status.textContent = 'OneSignal جاهز ✅';
  } catch (error) {
    console.error(error);
    status.textContent = 'فشل تشغيل OneSignal ❌';
  }
}

button.addEventListener('click', async () => {
  try {
    status.textContent = 'جاري طلب إذن الإشعارات...';

    const allowed =
      await OneSignal.Notifications.requestPermission(true);

    if (allowed) {
      status.textContent = 'تم تفعيل الإشعارات ✅';
    } else {
      status.textContent = 'تم رفض إذن الإشعارات ❌';
    }

  } catch (error) {
    console.error(error);
    status.textContent = 'حدث خطأ في طلب الإذن ❌';
  }
});

startOneSignal();
