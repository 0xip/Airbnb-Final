'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import{
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import {signIn} from "next-auth/react";

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation'; //new way to do this, not "next/router"

const LoginModal = () => {
    const router = useRouter();
    const RegisterModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials',{
          ...data,
          redirect:false,
        })
        .then((callback)=>{
          setIsLoading(false);
          
          if(callback?.ok){
            toast.success('Giriş Başarılı')
            router.refresh();
            LoginModal.onClose();
          }

          if (callback?.error){
            toast.error(callback.error);
          }
        })
    }

    const bodyContent=(
      <div className='flex flex-col gap-4'>
        <Heading
          title="Tekrar Hoşgeldiniz!"
          subtitle="Hesabınıza Giriş Yapın"
          center
        />
        <Input
          id="email"
          label='Email'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          type='password'
          label='Şifre'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
    
    const footerContent=(
      <div className='flex flex-col gap-4 mt-3'>
        <hr />
        <div
          className='
            text-neutral-500
            text-center
            mt-4
            font-light
          '
        >
          <div className='justify-center flex flex-row items-center gap-2'>
            <div>
              Zaten bir hesabınız var mı?
            </div>
            <div
              onClick={RegisterModal.onClose}
              className='
                text-neutral-800
                cursor-pointer
                hover:underline 
              '
            >
              Giriş Yap
            </div>
          </div>
        </div>
      </div>
    )

    return ( 
        <Modal
          disabled={isLoading}
          isOpen={LoginModal.isOpen}
          title="Giriş Yap"
          actionLabel='Devam et'
          onClose={LoginModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
          footer={footerContent}
        />
     );
}
 
export default LoginModal;