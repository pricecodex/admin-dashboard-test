import { Button } from '../button/Button.tsx';
import { ModalContainer } from './ModalContainer.tsx';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  message: string;
  onClose: Dispatch<SetStateAction<boolean>>;
  show?: boolean;
};
export const MessageModal = ({ message, onClose, show }: Props) => {
  return (
    <ModalContainer show={show} onClose={onClose} showCloseButton={false}>
      <div className={'flex flex-col items-center'}>
        <h1 className={'text-[22px] font-semibold mb-[19px]'}>{message}</h1>
        <Button className={'w-full'} onClick={() => onClose(false)} size={'sm'}>
          Закрыть
        </Button>
      </div>
    </ModalContainer>
  );
};
