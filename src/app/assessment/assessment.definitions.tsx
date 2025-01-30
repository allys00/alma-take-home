import * as yup from 'yup';
import { InferType } from 'yup';

const assessmentSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  countryOfCitizenship: yup
    .string()
    .required('Country of Citizenship is required'),
  websiteUrl: yup
    .string()
    .required('Linkedin / Personal Website URL is required'),
  visaCategories: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one visa category must be selected')
    .required('Visa category is required'),
  description: yup.string().required('Description is required'),
});

export type AssessmentSchema = InferType<typeof assessmentSchema>;

export default assessmentSchema;

export const VisaOptions = [
  {
    label: 'O-1',
    value: 'o-1',
  },
  {
    label: 'EB-1A',
    value: 'eb-1a',
  },
  {
    label: 'EB-2 NIW',
    value: 'eb-2-niw',
  },
  {
    label: "I don't know",
    value: 'idk',
  },
] as const;
