export type AssessmentType = 'CARS' | 'ADOS2' | 'MCHAT';

export interface AssessmentResult {
  title: string;
  total: number;
  category: string;
  summary: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  helperText?: string;
}

export const carsQuestions: Question[] = [
  { id: 'C1', text: 'Relates to people', options: ['1', '2', '3', '4'], helperText: '1 = Age-appropriate, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C2', text: 'Imitates others', options: ['1', '2', '3', '4'], helperText: '1 = Normal imitation, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C3', text: 'Emotional response', options: ['1', '2', '3', '4'], helperText: '1 = Appropriate response, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C4', text: 'Body use', options: ['1', '2', '3', '4'], helperText: '1 = Age-appropriate movement, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C5', text: 'Object use', options: ['1', '2', '3', '4'], helperText: '1 = Appropriate interest, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C6', text: 'Adaptation to change', options: ['1', '2', '3', '4'], helperText: '1 = Age-appropriate adaptability, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C7', text: 'Visual response', options: ['1', '2', '3', '4'], helperText: '1 = Age-appropriate visual response, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C8', text: 'Listening response', options: ['1', '2', '3', '4'], helperText: '1 = Age-appropriate auditory response, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C9', text: 'Taste, smell, touch response', options: ['1', '2', '3', '4'], helperText: '1 = Normal sensory responsiveness, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C10', text: 'Fear or nervousness', options: ['1', '2', '3', '4'], helperText: '1 = Normal fear/calmness, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C11', text: 'Verbal communication', options: ['1', '2', '3', '4'], helperText: '1 = Normal verbal response, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C12', text: 'Nonverbal communication', options: ['1', '2', '3', '4'], helperText: '1 = Normal gesture & expression, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C13', text: 'Activity level', options: ['1', '2', '3', '4'], helperText: '1 = Normal activity, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C14', text: 'Level and consistency of intellectual response', options: ['1', '2', '3', '4'], helperText: '1 = Uniform/normal intelligence, 2 = Mildly abnormal, 3 = Moderately abnormal, 4 = Severely abnormal' },
  { id: 'C15', text: 'General impressions', options: ['1', '2', '3', '4'], helperText: '1 = No autism, 2 = Mild autism, 3 = Moderate autism, 4 = Severe autism' },
];

export const adosQuestions: Question[] = [
  { id: 'A1', text: 'Reciprocal social interaction', options: ['0', '1', '2'], helperText: '0 = No abnormality, 1 = Mild/intermittent, 2 = Definite abnormality' },
  { id: 'A2', text: 'Shared enjoyment', options: ['0', '1', '2'], helperText: '0 = Spontaneous shared pleasure, 1 = Limited, 2 = Rare or absent' },
  { id: 'A3', text: 'Joint attention', options: ['0', '1', '2'], helperText: '0 = Uses eye gaze/pointing to share interest, 1 = Inconsistent, 2 = Little or none' },
  { id: 'A4', text: 'Social reciprocity', options: ['0', '1', '2'], helperText: '0 = Responsive and reciprocal, 1 = Mildly atypical, 2 = Marked limitation' },
  { id: 'A5', text: 'Communication demand', options: ['0', '1', '2'], helperText: '0 = Natural communicative bids, 1 = Occasional, 2 = Very few or absent' },
  { id: 'A6', text: 'Gesture use', options: ['0', '1', '2'], helperText: '0 = Uses varied descriptive gestures, 1 = Limited, 2 = Rare or absent' },
  { id: 'A7', text: 'Response to name', options: ['0', '1', '2'], helperText: '0 = Prompt response, 1 = Delayed or inconsistent, 2 = Unresponsive' },
  { id: 'A8', text: 'Eye contact', options: ['0', '1', '2'], helperText: '0 = Flexible, modulated gaze, 1 = Inconsistent, 2 = Poor or absent' },
  { id: 'A9', text: 'Restricted repetitive behavior', options: ['0', '1', '2'], helperText: '0 = None observed, 1 = Occasional repetitive motor movements, 2 = Marked/frequent' },
  { id: 'A10', text: 'Sensory behavior', options: ['0', '1', '2'], helperText: '0 = Normal interest, 1 = Mild sensory seeking, 2 = Distinct unusual sensory interest' },
  { id: 'A11', text: 'Play behavior', options: ['0', '1', '2'], helperText: '0 = Creative & flexible play, 1 = Somewhat repetitive, 2 = Stereotyped / rigid play' },
  { id: 'A12', text: 'Imagination / pretend play', options: ['0', '1', '2'], helperText: '0 = Spontaneous pretend play, 1 = Limited, 2 = Absent' },
];

export const mchatQuestions: Question[] = [
  { id: 'M1', text: 'Does your child enjoy being swung or bounced?', options: ['Yes', 'No'] },
  { id: 'M2', text: 'Does your child take an interest in other children?', options: ['Yes', 'No'] },
  { id: 'M3', text: 'Does your child pretend to be talking on the phone or pretend to feed a doll?', options: ['Yes', 'No'] },
  { id: 'M4', text: 'Does your child point to show you things?', options: ['Yes', 'No'] },
  { id: 'M5', text: 'Does your child follow your gaze when you point?', options: ['Yes', 'No'] },
  { id: 'M6', text: 'Does your child make eye contact?', options: ['Yes', 'No'] },
  { id: 'M7', text: 'Does your child respond to their name?', options: ['Yes', 'No'] },
  { id: 'M8', text: 'Does your child smile to get attention?', options: ['Yes', 'No'] },
  { id: 'M9', text: 'Does your child imitate you?', options: ['Yes', 'No'] },
  { id: 'M10', text: 'Does your child understand what people say?', options: ['Yes', 'No'] },
  { id: 'M11', text: 'Does your child use gestures like pointing or waving?', options: ['Yes', 'No'] },
  { id: 'M12', text: 'Does your child seem to be in their own world?', options: ['Yes', 'No'] },
  { id: 'M13', text: 'Does your child show unusual repetitive behaviors?', options: ['Yes', 'No'] },
  { id: 'M14', text: 'Does your child show concern for others?', options: ['Yes', 'No'] },
  { id: 'M15', text: 'Does your child show interest in toys or objects?', options: ['Yes', 'No'] },
  { id: 'M16', text: 'Does your child bring things to show you?', options: ['Yes', 'No'] },
];

export function scoreCars(answers: Record<string, number>): AssessmentResult {
  const values = Object.values(answers);
  const total = values.reduce((sum, v) => sum + v, 0);

  let category: string;
  if (total <= 27.5) {
    category = 'Low concern';
  } else if (total <= 33.5) {
    category = 'Moderate concern';
  } else if (total <= 36.5) {
    category = 'High concern';
  } else {
    category = 'Very high concern';
  }

  const summary = `CARS score is an indicator of autistic traits and should be used with clinical judgment.
Screening interpretation:
- 15-27.5: lower concern
- 28-33.5: moderate concern
- 34-36.5: high concern
- 37-60: very high concern`;

  return { title: 'CARS', total, category, summary };
}

export function scoreAdos(answers: Record<string, number>): AssessmentResult {
  const values = Object.values(answers);
  const total = values.reduce((sum, v) => sum + v, 0);

  let category: string;
  if (total <= 9) {
    category = 'Low concern';
  } else if (total <= 17) {
    category = 'Moderate concern';
  } else {
    category = 'High concern';
  }

  const summary = `ADOS-2 structured screening is not a standalone diagnosis.
It is intended for clinician-guided evaluation and module-specific interpretation.`;

  return { title: 'ADOS-2', total, category, summary };
}

export function scoreMchat(answers: Record<string, boolean>): AssessmentResult {
  const values = Object.values(answers);
  const total = values.filter(Boolean).length;

  let category: string;
  if (total <= 2) {
    category = 'Low risk';
  } else if (total <= 7) {
    category = 'Moderate risk';
  } else {
    category = 'High risk';
  }

  const summary = `M-CHAT risk categories are screening indicators and should not replace a clinical diagnosis.
Common interpretation:
- 0-2: low risk
- 3-7: moderate risk
- 8+: high risk`;

  return { title: 'M-CHAT', total, category, summary };
}
