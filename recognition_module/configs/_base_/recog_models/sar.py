#label_convertor = dict(
#    type='AttnConvertor', dict_type='DICT90', with_unknown=True)

label_convertor = dict(
    type='AttnConvertor', dict_type='DICT91', with_unknown=False, lower=True)
    #type='AttnConvertor', dict_list=list('0123456789 -.'), with_unknown=False, lower=True )

model = dict(
    type='SARNet',
    backbone=dict(type='ResNet31OCR'),
    encoder=dict(
        type='SAREncoder',
        enc_bi_rnn=False,
        enc_do_rnn=0.1,
        enc_gru=False,
    ),
    decoder=dict(
        type='ParallelSARDecoder',
        enc_bi_rnn=False,
        dec_bi_rnn=False,
        dec_do_rnn=0,
        dec_gru=False,
        pred_dropout=0.1,
        d_k=512,
        pred_concat=True),
    loss=dict(type='SARLoss'),
    label_convertor=label_convertor,
    max_seq_len=30)
