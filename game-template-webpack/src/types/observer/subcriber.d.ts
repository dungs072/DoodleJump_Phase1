interface SubcriberInterface<T>{
    receive(data: T): void;
}

export default SubcriberInterface