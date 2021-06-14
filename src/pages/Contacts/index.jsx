import { useState, useEffect } from 'react';
import botData from '../../private/bot.json';
import './index.css';
import { Modal } from '../../components/Modal';

export const Contacts = () => {
  const [userName, setUserName] = useState(false);
  const [userMessage, setUserMessage] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isCorrectData, setIsCorrectData] = useState(false);

  useEffect(() => {
    if (userName && userMessage) {
      const userNameRegExp = /^@.+/;
      const nameIsCorrect = userName.match(userNameRegExp);

      if (nameIsCorrect) {
        setIsCorrectData(true);
      } else {
        setIsCorrectData(false);
      }
    } else {
      setIsCorrectData(false);
    }
  }, [userName, userMessage]);

  return (
    <section className="Contacts">
      <h2 className="Contacts__title">НАШЕ СООБЩЕСТВО</h2>
      <p className="Contacts__description">
        Хотите что-то изменить? Есть нтересные идеи? Не хотите быть наблюдателем? Тогда можете присоединиться к нам.
        Вместе мы сможем (ну или попытаемся ^_^). Оставьте контакты в форме ниже.
      </p>

      <div className="Contacts__form-wrapper">
        <form className="Contacts__form" method="post">
          <input
            className="Contacts__form-input"
            onChange={(event) => setUserName(event.target.value)}
            type="text"
            placeholder="Telegram username *"
            required
          />
          <textarea
            className="Contacts__form-textarea"
            onChange={(event) => setUserMessage(event.target.value)}
            type="text"
            placeholder="Сообщение *"
            required
          />
          <button
            disabled={!isCorrectData}
            className={`Contacts__form-btn-submit ${isCorrectData ? '' : 'disable'}`}
            type="submit"
            onClick={(event) => sendForm(event)}
          >
            ОТПРАВИТЬ
          </button>
        </form>
      </div>

      <Modal isVisible={modalIsVisible} onClose={closeModal} title={modalTitle} />
    </section>
  );

  function sendForm(event) {
    event.preventDefault();

    const savedUsername = window.localStorage.getItem('username');

    if (savedUsername) {
      setModalTitle('Вы уже отправили запрос');
      setModalIsVisible(true);
    } else if (userName && userMessage && userName[0] === '@' && userName.length > 1) {
      const requestText = `<b>🤖 User:</b> ${userName} ➜ <b>💬 Message:</b> ${userMessage}`;
      const botRequest = `https://api.telegram.org/bot${botData.TOKEN}/sendMessage?chat_id=${botData.CHAT_ID}&parse_mode=html&text=${requestText}`;

      fetch(botRequest, {
        method: 'POST',
      })
        .then(() => {
          setModalTitle('Запрос успешно отправлен');
          setModalIsVisible(true);
          window.localStorage.setItem('username', userName);
        })
        .catch(() => {
          setModalTitle('Что-то не так. Попытайтесь снова');
          setModalIsVisible(true);
        });
    }
  }

  function closeModal() {
    setModalIsVisible(false);
  }
};
