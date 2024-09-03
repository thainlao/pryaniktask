import tg from '../assets/icons8-telegram-50.png';
import github from '../assets/icons8-github-50.png';

const Links = () => {
    return (
        <section className='links_section'>
            <a href='https://t.me/thainlaod'>
            <img src={tg} alt='telegram' />
            </a>
            <a href='/'>
            <img src={github} alt='github' />
            </a>
    
            <a href='https://hh.ru/resume/e36657c0ff0c0963660039ed1f6f354d496153'>
            <img src='https://i.hh.ru/logos/svg/hh.ru__min_.svg?v=11032019' alt='hh'/>
            </a>
      </section>
    )
}

export default Links;