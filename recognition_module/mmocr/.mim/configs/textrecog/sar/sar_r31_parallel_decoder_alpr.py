_base_ = [
    '../../_base_/default_runtime.py', '../../_base_/recog_models/sar.py',
    '../../_base_/schedules/schedule_adam_step_5e.py',
    '../../_base_/recog_pipelines/sar_pipeline.py',
    '../../_base_/recog_datasets/alpr_train.py'
]

train_list = {{_base_.train_list}}
test_list = {{_base_.test_list}}

train_pipeline = {{_base_.train_pipeline}}
test_pipeline = {{_base_.test_pipeline}}

data = dict(
    workers_per_gpu=4,
    samples_per_gpu=8,
    train_dataloader=dict(samples_per_gpu=10, drop_last=True),
    val_dataloader=dict(samples_per_gpu=6, workers_per_gpu=1),
    test_dataloader=dict(workers_per_gpu=16),
    train=dict(
        type='UniformConcatDataset',
        datasets=train_list,
        pipeline=train_pipeline),
    val=dict(
        type='UniformConcatDataset',
        datasets=test_list,
        pipeline=test_pipeline),
    test=dict(
        type='UniformConcatDataset',
        datasets=test_list,
        pipeline=test_pipeline))

evaluation = dict(interval=1, by_epoch=True, metric='acc')
checkpoint_config = dict(interval=1)
log_config = dict(
    interval=5,  # Print out the model's performance every 5 iterations
    hooks=[
        dict(type='TextLoggerHook')
    ])
