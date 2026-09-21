
import OneSignal from '@onesignal/capacitor-plugin';

const APP_ID = '94110f41-5110-46d1-8b75-351f4916327a';

const status = document.getElementById('status');
const button = document.getElementById('pushButton');

async function startOneSignal() {
  try {
    await OneSignal.initialize({
      appId: APP_ID
    });

    status.textContent = 'OneSignal تم تشغيله ✅';

    setTimeout(async () => {
      try {
        const id = OneSignal.User.pushSubscription.id;
        const token = OneSignal.User.pushSubscription.token;
        const optedIn = OneSignal.User.pushSubscription.optedIn;

        status.innerHTML =
          'OneSignal يعمل ✅<br><br>' +
          'Subscription ID:<br>' + (id || 'غير موجود ❌') +
          '<br><br>' +
          'Push Token:<br>' + (token ? 'موجود ✅' : 'غير موجود ❌') +
          '<br><br>' +
          'Opted In:<br>' + optedIn;
      } catch (error) {
        status.textContent =
          'خطأ في قراءة الاشتراك ❌ ' + error;
      }
    }, 3000);

  } catch (error) {
    console.error(error);
    status.textContent =
      'فشل تشغيل OneSignal ❌ ' + error;
  }
}

button.addEventListener('click', async () => {
  try {
    status.textContent =
      'جاري طلب إذن الإشعارات...';

    const allowed =
      await OneSignal.Notifications.requestPermission(true);

    status.textContent =
      allowed
        ? 'تم السماح بالإشعارات ✅ جاري التحقق...'
        : 'تم رفض الإشعارات ❌';

    if (allowed) {
      setTimeout(async () => {
        const id = OneSignal.User.pushSubscription.id;
        const token = OneSignal.User.pushSubscription.token;

        status.innerHTML =
          'تم السماح ✅<br><br>' +
          'Subscription ID:<br>' +
          (id || 'غير موجود ❌') +
          '<br><br>' +
          'Push Token:<br>' +
          (token ? 'موجود ✅' : 'غير موجود ❌');
      }, 3000);
    }

  } catch (error) {
    console.error(error);
    status.textContent =
      'حدث خطأ ❌ ' + error;
  }
});

startOneSignal();
