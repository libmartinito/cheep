<template>
    <section class="post">        
        <div class="post__interaction">user liked</div>
        <div class="post__main">
            <div class="post__icon"></div>
            <div class="post__content">
                <div class="post__header">
                    <div class="post__username">User</div>
                    <div class="post__handle">@username</div>
                    <div class="post__age">10h</div>
                </div>
                <div class="post__body">
                    {{ content }}
                </div>
                <div class="post__actions">
                    <div class="post__reply">
                        <div class="post__reply-icon"></div>
                        <div class="post__reply-counter">7</div>
                    </div>
                    <div class="post__recheep">
                        <div class="post__recheep-icon"></div>
                        <div class="post__recheep-counter">8</div>
                    </div>
                    <div class="post__react">
                        <div class="post__react-icon"></div>
                        <div class="post__react-counter">9</div>
                    </div>
                </div>  
            </div>                                  
            <div class="post__options">&#8231;&#8231;&#8231;</div>
        </div>
    </section>
</template>

<script>
    export default {
        props: ["content"]
    }
</script>

<style soped>
.post{
    padding: 1rem 0rem;
    border-bottom: 1px solid var(--neutral-200);
}
.post__interaction {
    margin-left: 4rem;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--neutral-600);
    cursor: pointer;
}
.post__interaction:hover {
    text-decoration: underline;
}
.post__main {
    display: flex;
}
.post__icon {
    background-image: url('../../assets/icon2.svg');
    background-size: contain;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid var(--neutral-600);
    cursor: pointer;
}
.post__icon:hover {
    opacity: 0.8;
}
.post__content {
    width: calc(100% - 3rem - 1rem);
    padding: 0rem 1rem;
}
.post__header,
.post__actions {
    display: flex;
}
.post__header {
    gap: 0.2rem;
}
.post__username {
    font-weight: 700;
    cursor: pointer;
}
.post__username:hover {
    text-decoration: underline;
}
.post__handle,
.post__age {
    color: var(--neutral-600);
}
.post__actions {
    gap: 6rem;
    margin: 0.5rem 0rem;
}
.post__reply,
.post__recheep,
.post__react {
    display: flex;
    gap: 0.1rem;
    cursor: pointer;
}
.post__reply-counter,
.post__recheep-counter,
.post__react-counter {
    font-size: 0.8rem;
    color: var(--neutral-600);
}
.post__reply:hover .post__reply-icon,
.post__recheep:hover .post__recheep-icon,
.post__react:hover .post__react-icon {
    background-color: var(--neutral-200);
    border-radius: 5px;
}
.post__reply:hover .post__reply-counter,
.post__recheep:hover .post__recheep-counter,
.post__react:hover .post__react-counter {
    color: var(--neutral-800);
}
.post__reply-icon {
    background-image: url('../../assets/reply.svg');
    background-size: contain;
    width: 1rem;
    height: 1rem;
}
.post__recheep-icon {
    background-image: url('../../assets/recheep.svg');
    background-size: contain;
    width: 1rem;
    height: 1rem;
}
.post__react-icon {
    background-image: url('../../assets/react.svg');
    background-size: contain;
    width: 1rem;
    height: 1rem;
}
.post__options {
    cursor: pointer;
    border-radius: 5px;
    width: 1rem;
    height: 1rem;
    text-align: center;
    vertical-align: center;
}
.post__options:hover {
    background-color: var(--neutral-200);   
}
</style>