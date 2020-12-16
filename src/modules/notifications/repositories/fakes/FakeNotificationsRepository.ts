import { ObjectID } from 'mongodb';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dto/ICreateNotificationDTO';

import Notification from '../../infra/typeorm/schemas/Notification';

// @EntityRepository(Appointment)
class NotificationsRepository implements INotificationRepository {
    private notification: Notification[] = [];

    public async create({
        // eslint-disable-next-line camelcase
        content,
        recipient_id,
    }: ICreateNotificationDTO): Promise<Notification> {
        const notification = new Notification();

        Object.assign(notification, { id: new ObjectID(), content, recipient_id });

        this.notification.push(notification);

        return notification;
    }
}

export default NotificationsRepository;
