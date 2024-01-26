'use client';

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../navbar/Categories";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

enum STEPS{
    CATEGORY=0,
    LOCATION=1,
    INFO=2,
    IMAGES=3,
    DESCRIPTION=4,
    PRICE=5
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc:'',
            price:1,
            title:'',
            description:''
        }
    });
    
    const category = watch("category");
    const location = watch("location");
    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");
    const bathroomCount = watch("bathroomCount");

    const Map = useMemo(() => dynamic(() => import("../Map"),//burada Map componentini dinamik olarak import ettik
    {ssr:false}), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true 
        })};

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE){
            return "Oluştur";
        }
        return "İleri";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY){
            return undefined;
        }
        return "Geri";
    }, [step]);

    let bodyContent = ( //değişken olduğu için let ile tanımladık
        <div className="flex flex-col gap-8">
            <Heading
              title="Hangisi Size daha uygun?"
              subtitle="Bir kategori seçin"
            />
            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              max-h-[50vh]
              overflow-y-auto
            ">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                          onClick={(category) => setCustomValue("category", category)}
                          selected={category === item.label}
                          label={item.label}
                          icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if(step === STEPS.LOCATION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Konumunuz nerede kalıyor?"
                    subtitle="Sizi bulmalarına yardım edin"
                />
                <CountrySelect
                  value={location}
                  onChange={(value) => setCustomValue("location", value)}
                />
                <Map
                  center={location?.latlng}
                />
            </div>
        )};

    if(step === STEPS.INFO){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Konumunuz hakkında biraz bilgi verin"
                    subtitle="Sizi bulmalarına yardım edin"
                />
                <Counter 
                    title="Misafir"
                    subtitle="Kaç misafir kalabilir?"
                    value={guestCount}
                    onChange={(value) => setCustomValue("guestCount", value)}
                />
                <hr />
                <Counter 
                    title="Oda"
                    subtitle="Kaç oda var?"
                    value={roomCount}
                    onChange={(value) => setCustomValue("roomCount", value)}
                />
                <hr />
                <Counter 
                    title="Banyo"
                    subtitle="Kaç banyo var?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                />
            </div>
        ) };

    if(step === STEPS.IMAGES){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Yerinizin fotoğraflarını yükleyin"
                    subtitle="Misafirlerinizin yerinizi görmesine yardımcı olun"
                />
                <ImageUpload/>
            </div>
        ) };

    if(step === STEPS.DESCRIPTION){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Yerinizi nasıl tanımlarsınız?"
                    subtitle="Lütfen kısa ve açıklayıcı olun"
                />
                <Input 
                  id="title"
                  label="Başlık"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
                <hr />
                <Input 
                  id="description"
                  label="Açıklama"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
            </div>
        ) };


    if(step === STEPS.PRICE){
        bodyContent=(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Şimdi bir fiyat belirleyin"
                    subtitle="Bir gece için ne kadar ücret almak istiyorsunuz?"
                />
                <Input 
                  id="price"
                  label="Fiyat"
                  formatPrice
                  type="number"
                  disabled={isLoading}
                  register={register}
                  errors={errors}
                  required
                />
            </div>
        ) };

    return ( 
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Airbnb senin evin"
            body={bodyContent}
        />
     );
}
 
export default RentModal;