'use client';

import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckboxWithText } from '@/components/shared/checkboxWithText';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import { FaFileUpload, FaHeart } from 'react-icons/fa';
import { IoDiceSharp } from 'react-icons/io5';
import assessmentSchema, {
  AssessmentSchema,
  VisaOptions,
} from './assessment.definitions';
import { FormErrorMessage } from '@/components/shared/formErrorMessage';
import SectionTitle from './components/sectionTitle';
import { SubmittedMessage } from './components/submittedMessage';
import { useEffect, useState } from 'react';
import { postLeads } from '@/service/leads.api';
import { uploadFile } from '@/service/files.api';
import { getCountries } from '@/service/countries.api';

export default function Assement() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<AssessmentSchema>({
    resolver: yupResolver(assessmentSchema),
  });

  const [countries, setCountries] = useState([]);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    getCountries().then(({ countries }) => setCountries(countries));
  }, []);

  const onSubmit: SubmitHandler<AssessmentSchema> = async (
    data: AssessmentSchema,
  ) => {
    if (file) {
      await uploadFile(file);
    }

    await postLeads(data);
  };

  if (isSubmitted) {
    return <SubmittedMessage onReset={reset} />;
  }

  return (
    <div className="row-start-2 flex flex-col items-center gap-8">
      <header className="flex h-80 w-screen flex-col items-start justify-center bg-australian-mint-200">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-0 sm:text-left">
          <Image
            src="/logo.png"
            alt="logo"
            height={35}
            width={70}
            className="mb-8"
          />
          <h2 className="mb-12 text-3xl font-extrabold leading-10 md:text-5xl md:leading-[60px]">
            Get An Assessment <br /> Of Your Imigration Case
          </h2>
        </div>
      </header>
      <main className="max-w-xl p-8 md:p-0">
        <section className="flex w-full flex-col items-center gap-2">
          <SectionTitle
            icon={BsFillInfoSquareFill}
            title="Want to understand your visa options?"
            description="Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals."
          />
        </section>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto mt-8 flex w-full flex-col items-center justify-center gap-4 text-center md:w-8/12"
        >
          {/* Basic Info */}
          <Input
            type="text"
            placeholder="First Name"
            {...register('firstName')}
          />
          <FormErrorMessage message={errors.firstName?.message} />

          <Input
            type="text"
            placeholder="Last Name"
            {...register('lastName')}
          />
          <FormErrorMessage message={errors.lastName?.message} />

          <Input type="email" placeholder="Email" {...register('email')} />
          <FormErrorMessage message={errors.email?.message} />

          <Controller
            control={control}
            name="countryOfCitizenship"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Country of Citizenship" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country: string) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FormErrorMessage message={errors.countryOfCitizenship?.message} />

          <Input
            type="text"
            placeholder="Linkedin / Personal Website URL"
            {...register('websiteUrl')}
          />
          <FormErrorMessage message={errors.websiteUrl?.message} />

          {/* Visa */}

          <SectionTitle
            icon={IoDiceSharp}
            title="Visa categories of interest"
          />

          <div className="mt-4 flex w-full flex-col gap-4">
            {VisaOptions.map((visa) => (
              <Controller
                key={visa.value}
                control={control}
                name="visaCategories"
                render={({ field }) => (
                  <CheckboxWithText
                    id={visa.value}
                    label={visa.label}
                    checked={field.value?.includes(visa.value)}
                    onCheckedChange={(checked) => {
                      const newArray = checked
                        ? [...(field.value ?? []), visa.value]
                        : field.value?.filter((value) => value !== visa.value);

                      field.onChange(newArray);
                    }}
                  />
                )}
              />
            ))}

            <FormErrorMessage message={errors.visaCategories?.message} />
          </div>

          <SectionTitle icon={FaFileUpload} title="Upload CV" />
          <Input
            onChange={(event) => {
              setFile(event.target.files?.[0]);
            }}
            id="cv"
            type="file"
          />

          {/* Description */}
          <SectionTitle icon={FaHeart} title="How can we help you?" />

          <Textarea
            {...register('description')}
            className="mt-4 h-32"
            placeholder="What is your current status and when does it expire?
                What is your past immigration history? Are you looking for long-term permanent residency or a short-term employment visa or both?
                Are there any timeline considerations?"
          />
          <FormErrorMessage message={errors.description?.message} />

          <Button className="m-auto mb-8 w-full" variant="default">
            Submit
          </Button>
        </form>
      </main>
    </div>
  );
}
