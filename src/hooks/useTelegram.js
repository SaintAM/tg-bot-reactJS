let tg = window.Telegram.WebApp;

export function useTelegram() {
  // onClose - закрывает web приложение
  const onClose = () => {
    tg.close();
  };
  // Для отображения/скрытия главной кнопки (которая снизу)
  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return {
    tg,
    // initDataUnsafe.user - данные о пользователе
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
    onClose,
    onToggleButton,
  };
}
