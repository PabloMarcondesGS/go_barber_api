import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IstorageProvider';
import DiskStorageProvider from './StorageProvider/implementatios/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);
