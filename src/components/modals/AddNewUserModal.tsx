import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { ModalContainer } from './ModalContainer.tsx';
import { Input } from '@/components/input/Input.tsx';
import { AppSelect } from '@/components/select/AppSelect.tsx';
import { Button } from '@/components/button/Button.tsx';

type Form = {
  name: string;
  email: string;
  permissions: string[];
  image: string;
};
type EditProps = {
  mode: 'edit';
  data: Form;
};
type AddProps = {
  mode: 'add';
  data?: never;
};
type CommonProps = {
  title?: string;
  show?: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onSubmit: (form: Form) => void;
};
type Props = CommonProps & (EditProps | AddProps);
export const AddNewUserModal = ({
  show,
  onClose,
  onSubmit,
  mode,
  data,
  title = 'Добавить нового пользователя',
}: Props) => {
  const [form, setForm] = useState<Form>(
    mode === 'edit'
      ? data
      : {
          name: 'Пользователь',
          email: '',
          permissions: [],
          image: '',
        }
  );
  const permissionsOptions = [
    {
      value: '1',
      label: 'Модерация объявлений',
    },
    {
      value: '2',
      label: 'Блог',
    },
    {
      value: '3',
      label: 'Тех. поддержка',
    },
    {
      value: '4',
      label: 'Обращения клиентов',
    },
    {
      value: '5',
      label: 'Аналитика',
    },
    {
      value: '6',
      label: 'Акции',
    },
  ];
  const onInputChange = (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(form);
    setForm({
      name: 'Пользователь',
      email: '',
      permissions: [],
      image: '',
    });
  };

  const submitButtonLabel = mode === 'edit' ? 'Редактировать пользователя' : 'Создать пользователя';

  return (
    <ModalContainer show={show} onClose={onClose}>
      <h1 className='text-[20px] font-bold'>{title}</h1>
      <form onSubmit={handleSubmit} className={'flex flex-col gap-3 mt-3'}>
        {/* <Input
          value={form.name}
          onChange={onInputChange('name')}
          inputSize={'md'}
          placeholder={'E-mail'}

        /> */}
        <Input
          value={form.email}
          onChange={onInputChange('email')}
          inputSize={'md'}
          placeholder={'E-mail'}
          type='email'
          required
        />
        <AppSelect
          options={permissionsOptions}
          value={form.permissions.map((p) => ({ value: p, label: p }))}
          onChange={(value) =>
            setForm((prev) => ({ ...prev, permissions: value.map((v) => v.label) }))
          }
          isMulti
          placeholder={'Выберите права доступа'}
        />
        <Button type={'submit'} size={'md'}>
          {submitButtonLabel}
        </Button>
      </form>
    </ModalContainer>
  );
};
