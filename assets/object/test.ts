import { _decorator, Component, Node, CircleCollider2D, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    start () {
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    private onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: any) {
        console.log(selfCollider.body.name);
        console.log(otherCollider.body.name);
    }
}


