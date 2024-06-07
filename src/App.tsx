import { ChangeEvent, useMemo, useState } from 'react';

import searchIcon from '@/assets/search.svg';
import menuIcon from '@/assets/menu.svg';
import usersJson from '../public/users.json';

// Components
import { Aside } from '@/components/sidebar/Sidebar';
import { Input } from '@/components/input/Input';
import { Button } from '@/components/button/Button';
import { User, UserCard } from '@/components/users/UserCard';
import { AddNewUserModal } from '@/components/modals/AddNewUserModal';
import { MessageModal } from '@/components/modals/MessageModal';

function App() {
  const [users, setUsers] = useState(usersJson ?? []);
  const [show, setShow] = useState(false);
  const [asideShow, setAsideShow] = useState(false);
  const [search, setSearch] = useState('');
  const [messageModal, setMessageModal] = useState(false);
  const [messageModalText, setMessageModalText] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredUsers = useMemo(
    () => users.filter((user) => user.email.toLowerCase().includes(search.toLowerCase())),
    [users, search]
  );

  const deleteUser = (user: User) => {
    setUsers((prev) => prev.filter((item) => item.id !== user.id));
    setMessageModal(true);
    setMessageModalText('Пользователь успешно удален');
  };
  const sendAgain = (user: User) => {
    setMessageModal(true);
    setMessageModalText(`Приглашение отправлено на почту ${user.email}`);
  };

  const editUser = (user: User) => {
    setUsers((prev) => prev.map((item) => (item.id === user.id ? user : item)));
    setMessageModal(true);
    setMessageModalText('Пользователь успешно обновлен');
  };

  return (
    <div className={'wrapper'} onClick={() => setAsideShow(false)}>
      <Aside onClose={setAsideShow} show={asideShow} />
      <div className=' w-full mx-auto md:rounded-[15px] md:shadow bg-white md:overflow-x-hidden  md:h-[590px] md:mt-[53px] py-[15px] px-[29px] md:mr-[100px]'>
        <div className='flex items-center flex-col gap-[15px] md:gap-0 md:flex-row justify-around'>
          <div className={'text-[26px] font-semibold mr-auto flex gap-[13px]'}>
            <img
              onClick={(event) => {
                event.stopPropagation();
                setAsideShow(true);
              }}
              className={'md:hidden'}
              src={menuIcon}
              alt='menu'
            />
            Команда
          </div>
          <div className='flex flex-col md:flex-row gap-[10px] w-full justify-end'>
            <div className='max-w-[650px] w-full'>
              <Input
                value={search}
                onChange={onChange}
                inputSize={'sm'}
                placeholder={'Поиск'}
                suffix={<img src={searchIcon} alt={'search icon'} />}
              />
            </div>
            <Button fz={18} onClick={() => setShow(true)} size={'sm'}>
              Добавить пользователя
            </Button>
          </div>
        </div>
        <div className='mt-[24px] md:mt-[16px]'>
          {filteredUsers.map((user) => (
            <UserCard
              onDeleteUser={deleteUser}
              onEditUser={editUser}
              sendAgain={sendAgain}
              key={user.id}
              user={user}
            />
          ))}
        </div>
      </div>

      <AddNewUserModal
        mode={'add'}
        onSubmit={(form) => {
          setUsers((prev) => [{ id: prev.length + 1, ...form }, ...prev]);
          setShow(false);
          setMessageModal(true);
          setMessageModalText('Пользователь успешно создан');
        }}
        onClose={setShow}
        show={show}
      />
      <MessageModal show={messageModal} message={messageModalText} onClose={setMessageModal} />
    </div>
  );
}

export default App;
