import Collider from "../base-types/components/Collider";
import RigidBody from "../base-types/components/Rigidbody";
import Transform from "../base-types/components/Transform";
import GameObject from "../base-types/GameObject";
import Vector2 from "../base-types/Vector2";

class PhysicManager{
    private physicObjs: GameObject[];
    private notStaticPhysicObjs: GameObject[];
    private readonly fixedDeltaTime = 0.02;

    private static instance: PhysicManager;

    constructor(){
        this.physicObjs = [];
        this.notStaticPhysicObjs = [];
    }
    public static getInstance(): PhysicManager{
        if (!PhysicManager.instance) {
            PhysicManager.instance = new PhysicManager();
        }
        return PhysicManager.instance;
    }
    public handleCorePhysic(): void {
        for (let i = 0; i < this.notStaticPhysicObjs.length; i++) {
            
            let rigidbody = this.notStaticPhysicObjs[i].getComponent(RigidBody);
            let transform = this.notStaticPhysicObjs[i].getComponent(Transform);
            if (transform == null) {
                return;
            }
            let collider = this.notStaticPhysicObjs[i].getComponent(Collider);
            if (collider == null) {
                return;
            }
            let topLeft = new Vector2(transform.getPosition().x, transform.getPosition().y + collider.getOffset());
            let downRight = new Vector2(transform.getScale().x, transform.getScale().y-collider.getOffset());

            collider.setBounds(topLeft, downRight);
            for (let j = 0; j < this.physicObjs.length; j++) {
                if(this.notStaticPhysicObjs[i]==this.physicObjs[j]){
                    continue;
                }
                let otherCollider = this.physicObjs[j].getComponent(Collider);
                
                if (otherCollider == null) {
                    continue;
                }

                if (!collider.getIsTrigger()&&collider.hasCollision(otherCollider)) {
                    this.notStaticPhysicObjs[i].onCollisionEnter(this.physicObjs[j]);
                }
                
            }

            if (rigidbody == null) {
                return;
            }
            if (!rigidbody.getVelocity().isZero()) {
                let jumpPosition = Vector2.multiply(rigidbody.getVelocity(), this.fixedDeltaTime);
                let newPosition = Vector2.add(transform.getPosition(), jumpPosition);
                transform.setPosition(newPosition);
                rigidbody.clampToZeroVelocity(this.fixedDeltaTime * 50);
            }
            if (rigidbody?.canUseGravity()) {
                let distance = rigidbody.getMass() * this.fixedDeltaTime;
                let dropPosition = Vector2.multiply(Vector2.down(), distance);

                let newPosition = Vector2.add(transform.getPosition(), dropPosition);
                transform.setPosition(newPosition);
            }
        }
        for(let i =0;i< this.physicObjs.length;i++){
            let collider = this.physicObjs[i].getComponent(Collider);
            if (collider == null) {
                continue;
            }
            let transform = this.physicObjs[i].getComponent(Transform);
            if (transform == null) {
                continue;
            }
            let downRight = collider.getDownRightBound()
            collider.setBounds(transform.getPosition(), downRight);
        }
    }

    public addNotStaticPhysicObj(obj: GameObject): void{
        this.notStaticPhysicObjs.push(obj);
    }
    public addphysicObjs(obj: GameObject): void{
        this.physicObjs.push(obj);
    }
    public removePhysicObjs(obj: GameObject): void {
        let indexPhysic = this.physicObjs.indexOf(obj);
        this.physicObjs.splice(indexPhysic, 1);
    }
    public removeNotStaticPhysicObjs(obj: GameObject): void {
        let indexPhysic = this.notStaticPhysicObjs.indexOf(obj);
        this.notStaticPhysicObjs.splice(indexPhysic, 1);
    }
   
    public getFixedDeltaTime(): number{
        return this.fixedDeltaTime;
    }
    public clearData(): void{
        this.physicObjs = [];
        //this.notStaticPhysicObjs = [];
    }
}
export default PhysicManager;