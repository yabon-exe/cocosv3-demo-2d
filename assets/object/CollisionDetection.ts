import { _decorator, Component, CircleCollider2D, Collider2D, Contact2DType } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('CollisionDetection')
export class CollisionDetection extends Component {
    start () {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    private onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {
        console.log(selfCollider.name);
        console.log(otherCollider.name);
    }
}