# Тестовое задание для Pryanik

https://thainlao.github.io/pryaniktask

---
# React, Vite, Typescirpt, CSS

### Приложение польностью типизированно, для стилей у вас написано использовать Material UI, но я имею с ним малый опыт поэтому воспользовался чистым CSS
---
## Авторизация

### В задании не было указано возможности использования каких-либо стейт-мененджеров по типу redux/mobx и для авторизации я использовал useContext. Он имеет свои недостатки но для SPA приложения, на мой взгляд, вполне себе актуален. Но в своих проектах я предпочитаю использование RTK
---

---
### Также в проекте реализована адаптивная верстка, проверки на авторизацию для запросов.

```
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const tokenFromStorage = localStorage.getItem('token');
    if (!tokenFromStorage || state.isAuthenticated !== true) {
      setError('You are not authorized to create records.');
      toast.error('You are not authorized to create records.');
      logout();
      navigate('/');
      return;
    }

    try {
      const response = await axios.post('https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/create', formData, {
        headers: { 'x-auth': tokenFromStorage },
      });

      if (response.status === 200) {
        onSave(response.data.data);
        toast.success('Успешно создали запись');
      } else {
        setError('Failed to create record');
      }
    } catch (err) {
      setError('An error occurred while creating the record');
    } finally {
      setLoading(false);
    }
  };
```

### Даже если пользователь авторизовался и удалил токен через Application (иммитация того, что токен сгорел), выполнить запрос он не сможет, и его отправит на loginPage. Из плюсов данного алгоритма могу выделить что изначально происходит проверка авторизации, далее уже выполнение запроса, из минусов использование localStorage, так как это может быть уязвимо для ралзичных атак.

---

### Так же реализовал модальное окно, которое по всем канонам открывается с анимацией, закрывается при esc, нажатием за пределы модального окна и дефолтную кнопку закрытия
```
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  // Закрытие при клике за пределами модального окна
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).classList.contains('delete-confirm-overlay')) {
      onCancel();
    }
  };
```

