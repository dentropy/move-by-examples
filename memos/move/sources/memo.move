module transfer_with_memo::transfer_with_memo {
    use std::signer;
    use std::vector;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::event;

    const E_INVALID_MEMO_LENGTH: u64 = 1;

    #[event]
    struct TransferEvent has drop, store {
        sender: address,
        to: address,
        memo: vector<u8>,
    }

    public entry fun transfer_with_memo(
        sender: &signer,
        to: address,
        amount: u64,
        memo: vector<u8>
    ) {
        assert!(vector::length(&memo) == 64, E_INVALID_MEMO_LENGTH);
        let sender_addr = signer::address_of(sender);
        coin::transfer<AptosCoin>(sender, to, amount);
        event::emit(TransferEvent {
            sender: sender_addr,
            to,
            memo,
        });
    }

    #[view]
    public fun get_memo_length(memo: vector<u8>): u64 {
        vector::length(&memo)
    }
}