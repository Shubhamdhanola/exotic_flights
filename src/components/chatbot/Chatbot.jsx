import './style.css';
import Image from 'next/image';

const Chatbot = () => {
    return (
        <>
            {/* <div className="chatContainer h-[500px] w-[400px] bg-gray-600 shadow-xl px-2">
                    <div className="displayChat my-2">
                        <p>how are you?</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} id="chatbotForm" className='flex gap-2'>
                        <textarea name="search" id=""></textarea>
                        <button className=''>
                            <Image src="/icons/play_button.png"
                                width={25}
                                height={25}
                                alt="chatbot"
                            />
                        </button>
                    </form>
                </div> */}
            <div className="chatLogo">
                <a href="http://localhost:3000//pages/chatbot">
                    <Image src="/images/chatbot.png"
                        width={120}
                        height={120}
                        alt="chatbot"
                    />
                </a>
            </div>
        </>
    )
}

export default Chatbot