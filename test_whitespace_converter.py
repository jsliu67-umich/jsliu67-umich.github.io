#!/usr/bin/env python3
"""
Test script for Whitespace Converter
Demonstrates encoding and decoding whitespace characters to escape sequences
"""

def encode_whitespace(text):
    """
    Convert whitespace characters to their escape sequence representations
    
    Args:
        text (str): Input text with actual whitespace characters
        
    Returns:
        str: Text with whitespace converted to escape sequences
    """
    result = text
    # Escape existing backslashes first
    result = result.replace('\\', '\\\\')
    # Windows line endings
    result = result.replace('\r\n', '\\r\\n')
    # Unix line endings
    result = result.replace('\n', '\\n')
    # Mac line endings
    result = result.replace('\r', '\\r')
    # Tabs
    result = result.replace('\t', '\\t')
    # Form feeds
    result = result.replace('\f', '\\f')
    # Vertical tabs
    result = result.replace('\v', '\\v')
    
    return result


def decode_whitespace(text):
    """
    Convert escape sequences back to actual whitespace characters
    
    Args:
        text (str): Input text with escape sequences
        
    Returns:
        str: Text with escape sequences converted to actual whitespace
    """
    result = text
    # Windows line endings
    result = result.replace('\\r\\n', '\r\n')
    # Newlines
    result = result.replace('\\n', '\n')
    # Carriage returns
    result = result.replace('\\r', '\r')
    # Tabs
    result = result.replace('\\t', '\t')
    # Form feeds
    result = result.replace('\\f', '\f')
    # Vertical tabs
    result = result.replace('\\v', '\v')
    # Unescape backslashes last
    result = result.replace('\\\\', '\\')
    
    return result


def test_encode_decode():
    """Run comprehensive tests for encode and decode functions"""
    
    print("=" * 60)
    print("WHITESPACE CONVERTER TEST SUITE")
    print("=" * 60)
    
    # Test 1: Simple newlines
    print("\n📝 Test 1: Unix Newlines")
    test1 = "Hello\nWorld\nPython"
    encoded1 = encode_whitespace(test1)
    decoded1 = decode_whitespace(encoded1)
    print(f"Original: {repr(test1)}")
    print(f"Encoded:  {encoded1}")
    print(f"Decoded:  {repr(decoded1)}")
    print(f"✅ Pass" if test1 == decoded1 else "❌ Fail")
    
    # Test 2: Tabs
    print("\n📝 Test 2: Tabs")
    test2 = "function example() {\n\treturn true;\n}"
    encoded2 = encode_whitespace(test2)
    decoded2 = decode_whitespace(encoded2)
    print(f"Original: {repr(test2)}")
    print(f"Encoded:  {encoded2}")
    print(f"Decoded:  {repr(decoded2)}")
    print(f"✅ Pass" if test2 == decoded2 else "❌ Fail")
    
    # Test 3: Windows line endings
    print("\n📝 Test 3: Windows Line Endings (\\r\\n)")
    test3 = "Line 1\r\nLine 2\r\nLine 3"
    encoded3 = encode_whitespace(test3)
    decoded3 = decode_whitespace(encoded3)
    print(f"Original: {repr(test3)}")
    print(f"Encoded:  {encoded3}")
    print(f"Decoded:  {repr(decoded3)}")
    print(f"✅ Pass" if test3 == decoded3 else "❌ Fail")
    
    # Test 4: Mixed whitespace
    print("\n📝 Test 4: Mixed Whitespace")
    test4 = "Name:\tJohn\nAge:\t30\nCity:\tNew York"
    encoded4 = encode_whitespace(test4)
    decoded4 = decode_whitespace(encoded4)
    print(f"Original: {repr(test4)}")
    print(f"Encoded:  {encoded4}")
    print(f"Decoded:  {repr(decoded4)}")
    print(f"✅ Pass" if test4 == decoded4 else "❌ Fail")
    
    # Test 5: Backslashes
    print("\n📝 Test 5: Existing Backslashes")
    test5 = "C:\\Users\\John\\file.txt"
    encoded5 = encode_whitespace(test5)
    decoded5 = decode_whitespace(encoded5)
    print(f"Original: {repr(test5)}")
    print(f"Encoded:  {encoded5}")
    print(f"Decoded:  {repr(decoded5)}")
    print(f"✅ Pass" if test5 == decoded5 else "❌ Fail")
    
    # Test 6: Code snippet with multiple whitespace types
    print("\n📝 Test 6: Python Code Snippet")
    test6 = """def hello():
\tprint("Hello, World!")
\treturn True"""
    encoded6 = encode_whitespace(test6)
    decoded6 = decode_whitespace(encoded6)
    print(f"Original:\n{test6}")
    print(f"\nEncoded:\n{encoded6}")
    print(f"\nDecoded:\n{decoded6}")
    print(f"✅ Pass" if test6 == decoded6 else "❌ Fail")
    
    # Test 7: JSON with escaped characters
    print("\n📝 Test 7: JSON String")
    test7 = '{"name":"John","address":"123 Main St\\nNew York, NY"}'
    encoded7 = encode_whitespace(test7)
    decoded7 = decode_whitespace(encoded7)
    print(f"Original: {test7}")
    print(f"Encoded:  {encoded7}")
    print(f"Decoded:  {decoded7}")
    print(f"✅ Pass" if test7 == decoded7 else "❌ Fail")
    
    # Test 8: Empty and single characters
    print("\n📝 Test 8: Edge Cases")
    test8_empty = ""
    test8_tab = "\t"
    test8_newline = "\n"
    print(f"Empty: {repr(test8_empty)} -> {repr(encode_whitespace(test8_empty))}")
    print(f"Tab: {repr(test8_tab)} -> {encode_whitespace(test8_tab)}")
    print(f"Newline: {repr(test8_newline)} -> {encode_whitespace(test8_newline)}")
    print(f"✅ Pass")
    
    print("\n" + "=" * 60)
    print("ALL TESTS COMPLETE")
    print("=" * 60)


def interactive_mode():
    """Interactive mode for testing custom inputs"""
    print("\n🔧 INTERACTIVE MODE")
    print("Enter text to encode/decode (or 'quit' to exit)")
    print("-" * 60)
    
    while True:
        print("\n[1] Encode (text → \\n, \\t, etc.)")
        print("[2] Decode (\\n, \\t, etc. → text)")
        print("[3] Run test suite")
        print("[4] Quit")
        
        choice = input("\nChoice: ").strip()
        
        if choice == '1':
            text = input("Enter text to encode: ")
            result = encode_whitespace(text)
            print(f"\nEncoded: {result}")
            print(f"Visual:  {repr(result)}")
            
        elif choice == '2':
            text = input("Enter text to decode: ")
            result = decode_whitespace(text)
            print(f"\nDecoded: {result}")
            print(f"Visual:  {repr(result)}")
            
        elif choice == '3':
            test_encode_decode()
            
        elif choice == '4' or choice.lower() == 'quit':
            print("Goodbye! 👋")
            break
            
        else:
            print("Invalid choice. Please try again.")


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--interactive":
        interactive_mode()
    else:
        test_encode_decode()
        print("\n💡 Tip: Run with --interactive flag for interactive mode")
        print("   python test_whitespace_converter.py --interactive")

