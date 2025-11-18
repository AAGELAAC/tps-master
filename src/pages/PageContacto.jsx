import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function PageContacto() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_bccx78q', 'template_79kn84o', form.current, {
                publicKey: 'CzkeZ3rwKj1sT9uTy',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    alert('Correo enviado exitosamente');
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    alert('Error al enviar el correo. Inténtalo de nuevo más tarde.');
                },
            );
    };

    return (
        <>
            <form ref={form} onSubmit={sendEmail} className='flex flex-col gap-4'>
                <label className='font-bold mb-0.5 size-3.5'>Name</label>
                <input type="text" name="user_name" className='p-2 border border-gray-300 rounded text-base w-full min-w-[300px] focus:outline-none focus:border-blue-500' />
                <label className='font-bold mb-0.5 size-3.5'>Email</label>
                <input type="email" name="user_email" className='p-2 border border-gray-300 rounded text-base w-full min-w-[300px] focus:outline-none focus:border-blue-500' />
                <label className='font-bold mb-0.5 size-3.5'>Message</label>
                <textarea name="message" className='p-2 border border-gray-300 rounded text-base w-full min-w-[300px] resize-y min-h-[80px] font-inherit focus:outline-none focus:border-blue-500' />
                <input type="submit" value="Send" className='bg-indigo-500 hover:bg-green-600 px-4 py-2 border-none rounded text-base font-bold cursor-pointer mt-1 text-white transition-colors duration-200' />
            </form>
            <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                minHeight: '360px',
                boxShadow: '0 18px 40px -24px rgba(15, 23, 42, 0.35)'
            }}>
                <iframe
                    title="Ubicación del hotel"
                    src="https://maps.google.com/maps?q=Salta%20Capital%2C%20Argentina&z=13&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </>
    );
};
